$(document).ready(function () {
  console.log("ready!");
  const dropdown_btn = $('.dropdown-button');
  const dropdown_list = $('.dropdown-list');
  const dropdown_menu = $('.dropdown-menu');
  const dropdown_list_input = $('.dropdown-list_input');
  const btn_submit = $('.btn-submit');

  // Show menu
  dropdown_btn
    .click(function () {
      console.log('btn clicked')
      dropdown_list.addClass('show');

      setTimeout(function () {
        dropdown_list_input.focus();
      }, 300);
    });

  // Stop event propagation
  btn_submit.click(function (e) {
    e.stopPropagation();
    /// Submit the selection

  });

  // list of document clicks, to hide drops or use for top level controls
  $(document).mouseup(function (e) {
    // if the target of the click isn't the container nor a descendant of the container
    if (!dropdown_list.is(e.target) && dropdown_list.has(e.target).length === 0) {
      dropdown_list.removeClass('show');
    }
  });

  /*** JSON of States for demo purposes, note used date ISO format
   *** for more flexibility, e.g. if we want to add date picker/range
   *** pinter so users can filter by dates and time as well as the event name
   ***/
  let usStates = [
    {name: 'Summer Party', abbreviation: 'SP_JUL_2023', dateTime: '15:00 7th July 2023'},
    {name: '  Christmas Party', abbreviation: 'CP_DEC_203', dateTime: '19:00 18th Dec 2023'},
    {name: 'Marathon', abbreviation: 'M_SEP_2024', dateTime: '13:00 15th Sept 2024'},
  ];

// Populate the list with states
  usStates.forEach(function (item) {
    let stateTemplate = `<li class="dropdown-item">
      <input name="${item.abbreviation}" type="checkbox">
      <label for="${item.abbreviation}">${item.name}</label>
      </li>
      `
    dropdown_menu.append(stateTemplate);
  });

  // Filter the list on keyup
  dropdown_list_input.on('input',
    function (e) {
      let search = e.target.value.toLowerCase();
      console.log(search);

      if (!search) {
        dropdown_menu.find('li').show();
        return false;
      }

      dropdown_menu.find('li').each(function () {
        let text = $(this).text().toLowerCase();
        let match = text.indexOf(search) > -1;
        $(this).toggle(match);
      });
    }
  );

});
