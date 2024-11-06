$(document).ready(function () {
  const dropdownBtn = $('.dropdown-button');
  const clearBtn = $('.dropdown-list_clear');
  const dropdownList = $('.dropdown-list');
  const dropdownMenu = $('.dropdown-menu');
  const dropdownSearchInput = $('.dropdown-list_search_input');
  const submitBtn = $('.btn-submit');

  // JSON data for events
  const eventList = [
    {name: 'Summer Party', id: 'SP_JUL_2023', dateTime: '15:00 7th July 2023'},
    {name: 'Christmas Party', id: 'CP_DEC_2023', dateTime: '19:00 18th Dec 2023'},
    {name: 'Marathon', id: 'M_SEP_2024', dateTime: '13:00 15th Sept 2024'},
    // Add more events as needed for testing with large datasets
  ];



  // Add Hundreds of events
  function addEvents() {
    for (let i = 0; i <= 130; i++) {
      let event = {
        name: `Event Name - ${i}`,
        id: `event_${i}`, // Unique ID for each event
        dateTime: '13:00 15th Sept 2024'
      };
      eventList.push(event);
    }
    // Refresh dropdown options with new events
    populateDropdown();
  }

  // Array to track selected events
  let selectedList = [];

  // Check if submit button should be enabled or disabled
  const updateSubmitButtonState = () => {
    submitBtn.prop('disabled', selectedList.length === 0);
  };

  // Toggle dropdown visibility
  dropdownBtn.click(function () {
    dropdownList.toggleClass('show');
    setTimeout(() => dropdownSearchInput.focus(), 300);
  });

  // Close dropdown when clicking outside of it
  $(document).mouseup(function (e) {
    if (!dropdownList.is(e.target) && dropdownList.has(e.target).length === 0) {
      dropdownList.removeClass('show');
    }
  });

  // Populate dropdown with event items
  const populateDropdown = () => {
    dropdownMenu.empty();
    eventList.forEach((event) => {
      const itemTemplate = `
        <li class="dropdown-item">
          <label for="${event.id}">
            <input name="${event.id}" id="${event.id}" type="checkbox">
            ${event.name} - ${event.dateTime}
          </label>
        </li>`;
      dropdownMenu.append(itemTemplate);
    });
  };

  // Filter events in the dropdown based on search input
  dropdownSearchInput.on('input', function (e) {
    const search = e.target.value.toLowerCase();
    dropdownMenu.find('li').each(function () {
      const text = $(this).text().toLowerCase();
      $(this).toggle(text.includes(search));
    });
  });

  // Update selected list and display count
  dropdownList.on('change', '[type="checkbox"]', function () {
    const current = $(this)[0];
    const item = eventList.find(i => i.id === current.id);

    if (current.checked) {
      selectedList.push(item.id);
    } else {
      selectedList = selectedList.filter(id => id !== current.id);
    }

    const numChecked = selectedList.length;
    dropdownBtn.find('.quantity').text(numChecked || 'Any');
    updateSubmitButtonState();
  });

  // Submit selected items
  submitBtn.click(function (e) {
    e.preventDefault();
    alert(`Post Items: ${selectedList.join(', ')}`);
    // Replace alert with actual post request logic if needed
  });

  // Clear all selections
  clearBtn.click(() => {
    dropdownList.find('input[type=checkbox]').prop('checked', false);
    selectedList = [];
    dropdownBtn.find('.quantity').text('Any');
    updateSubmitButtonState();
  });

  // Initial population of dropdown and button state
  populateDropdown();
  updateSubmitButtonState();
  addEvents();
});
