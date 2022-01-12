import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
})
export class CustomSelectComponent
  implements OnInit, AfterContentInit, AfterContentChecked
{
  @Input('options') options: any[] = [];
  @Input('label') label: string = '';
  @Output('onChange') onChange = new EventEmitter<any>();
  isInitilized = false;
  constructor() {}
  ngAfterContentChecked(): void {
    // this.initializeDropdown();
  }
  ngAfterContentInit(): void {
    setTimeout(() => {
      this.initializeDropdown();
    }, 500);
  }

  ngOnInit(): void {}

  initializeDropdown() {
    this.isInitilized = true;
    const that = this;
    $('select').each(function () {
      var $this = $(this),
        numberOfOptions = $(this).children('option').length;
      console.log('numberOfOptions', numberOfOptions);
      $this.addClass('select-hidden');
      $this.wrap('<div class="select"></div>');
      $this.after('<div class="select-styled"></div>');

      var $styledSelect = $this.next('div.select-styled');

      var $list = $('<ul />', {
        class: 'select-options',
      }).insertAfter($styledSelect);

      for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
          text: $this.children('option').eq(i).text(),
          rel: $this.children('option').eq(i).val(),
        }).appendTo($list);
      }

      var $listItems = $list.children('li');

      // $styledSelect.text($this.children('option').eq(0).text());
      // $listItems.eq(0).addClass('selected');
      // this.onChange.emit(this.options[0]);

      that.onSelectItem(
        $styledSelect,
        $listItems,
        $listItems.eq(0),
        $this.children('option').eq(0).text()
      );

      $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.select-styled.active')
          .not(this)
          .each(function () {
            $(this).removeClass('active').next('ul.select-options').hide();
          });
        $(this).toggleClass('active').next('ul.select-options').toggle();
      });

      $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();

        that.onSelectItem($styledSelect, $listItems, $(this), $(this).text());
        //console.log($this.val());
      });

      $(window).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
      });
    });
  }

  onSelectItem($styledSelect, $listItems, $item, label) {
    const selectedItem = this.options.find(
      (op) => op.label.trim() == label.trim()
    );
    if (!selectedItem) return;
    $styledSelect.text(selectedItem.label);
    // $listItems.eq(0).addClass('selected');
    // remove selected class
    $listItems.each(function () {
      $(this).removeClass('selected');
    });
    $item.addClass('selected');
    this.onChange.emit(selectedItem);
  }
}
