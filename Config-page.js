 $(document).ready(function () {
            // Configuration for form behavior
            var FORM_SELECTORS = [".form_form", ".form_form2", ".form_form3"];  
            var HIDE_SUCCESS_MESSAGE = false;  // Set to true to hide the success message
            var SUCCESS_MESSAGE_ABOVE_FORM = true;  // Set to true to show success message above form

            // Dynamic field management configuration
            var maxFields = 10;  // Maximum number of dynamic fields
            var dynamicFieldPrefixes = [
            "dynamic-option", 
            "dynamic-second-option", 
            "dynamic-third-option", 
            "dynamic-fourth-option", 
            "dynamic-fifth-option"];  // Prefixes of IDs for dynamic fields

            // Initialize form behavior
    // Modified Initialize form behavior to handle multiple forms
    function initializeFormBehavior() {
        FORM_SELECTORS.forEach(function(selector) {
            var form = $(selector);
            var successDiv = form.next();

            if (!HIDE_SUCCESS_MESSAGE && SUCCESS_MESSAGE_ABOVE_FORM) {
                form.parent().append(form);
            }

            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.attributeName === "style" && form.css("display") === "none") {
                        form.css("display", "block");
                        successDiv.css("display", HIDE_SUCCESS_MESSAGE ? "none" : "block");
                    }
                });
            });
            observer.observe(form[0], { attributes: true, attributeFilter: ["style"] });
        });
    }

            // Save input values to localStorage
            function saveInputValue(event) {
                var val = $(event.currentTarget).val();
                var id = $(event.currentTarget).attr('id');
                localStorage.setItem(id, val);
            }

            // Get saved value from localStorage
            function getSavedValue(v) {
                return localStorage.getItem(v) || "";
            }

            // Load saved values and set up event listeners
            function setupInputFields() {
                $('input[type="text"]').each(function () {
                    var id = $(this).attr('id');
                    $(this).val(getSavedValue(id));
                    $(document).on('change', '#' + id, saveInputValue);
                });
            }

            // Handle adding a new field
            function addNewField(buttonAdd, buttonRemove, className, fieldId) {
                var count = $(className).length + 1;
                if (count <= maxFields) {
                    var field = $("#" + fieldId + "-1").clone();
                    field.attr("id", fieldId + "-" + count);
                    field.find("input").each(function (index) {
                        var newId = fieldId + "-" + count + "-" + index;
                        $(this).attr({
                            "id": newId,
                            "name": newId,
                            "data-name": newId,
                            "value": getSavedValue(newId)
                        });
                    });
                    $(className + ":last").after(field);
                    setupInputFields();
                }
                updateButtonState(buttonAdd, buttonRemove, className);
            }

            // Remove the last field
            function removeLastField(buttonAdd, buttonRemove, className) {
                var lastFieldIndex = $(className).length;
                if (lastFieldIndex > 1) {
                    var lastField = $(className + ':last');
                    lastField.find('input').each(function () {
                        var id = $(this).attr('id');
                        localStorage.removeItem(id);
                    });
                    lastField.remove();
                }
                updateButtonState(buttonAdd, buttonRemove, className);
            }

            // Update add/remove button state
            function updateButtonState(buttonAdd, buttonRemove, className) {
                var totalFields = $(className).length;

                // Edit: show/hide removeButton based on total fields 
                if(totalFields > 1){buttonRemove.css("display","block")}
                else if(totalFields <= 1){buttonRemove.css("display","none")}

                buttonRemove.prop("disabled", totalFields <= 1);
                buttonAdd.prop("disabled", totalFields >= maxFields);
            }

            // Load dynamic fields based on saved values
    function loadDynamicFields() {
        dynamicFieldPrefixes.forEach(function (prefix) {
            var fieldClass = "." + prefix;
            var index = 2; // Start from 2 as the 1st is already there

            while (true) {
                var fieldExists = getSavedValue(prefix + "-" + index + "-0");
                if (fieldExists && fieldExists !== "") {
                    if (index > 1) { // Do not duplicate the first field
                        switch (prefix) {
                            case "dynamic-second-option":
                                addNewField($("#add-second-option"), $("#remove-second-option"), fieldClass, prefix);
                                break;
                            case "dynamic-third-option":
                                addNewField($("#add-third-option"), $("#remove-third-option"), fieldClass, prefix);
                                break;
                            case "dynamic-fourth-option":
                                addNewField($("#add-fourth-option"), $("#remove-fourth-option"), fieldClass, prefix);
                                break;
                            case "dynamic-fifth-option":
                                addNewField($("#add-fifth-option"), $("#remove-fifth-option"), fieldClass, prefix);
                                break;
                            default:
                                addNewField($("#add-option"), $("#remove-option"), fieldClass, prefix);
                                break;
                        }
                    }
                    index++;
                } else {
                    break; // Exit loop if no saved value found
                }
            }
        });
    }


    
            // Initialize
            initializeFormBehavior();
            loadDynamicFields();
            setupInputFields();

            // Event handlers
            $("#add-option").click(function () {
                addNewField($(this), $("#remove-option"), ".dynamic-option", "dynamic-option");
            });

            $("#remove-option").click(function () {
                removeLastField($(this), $("#remove-option"), ".dynamic-option");
            });

            $("#add-second-option").click(function () {
                addNewField($(this), $("#remove-second-option"), ".dynamic-second-option", "dynamic-second-option");
            });

            $("#remove-second-option").click(function () {
                removeLastField($(this), $("#remove-second-option"), ".dynamic-second-option");
            });
            $("#add-third-option").click(function () {
                addNewField($(this), $("#remove-third-option"), ".dynamic-third-option", "dynamic-third-option");
            });

            $("#remove-third-option").click(function () {
                removeLastField($(this), $("#remove-third-option"), ".dynamic-third-option");
            });
            $("#add-fourth-option").click(function () {
                addNewField($(this), $("#remove-fourth-option"), ".dynamic-fourth-option", "dynamic-fourth-option");
            });

            $("#remove-fourth-option").click(function () {
                removeLastField($(this), $("#remove-fourth-option"), ".dynamic-fourth-option");
            });
            $("#add-fifth-option").click(function () {
                addNewField($(this), $("#remove-fifth-option"), ".dynamic-fifth-option", "dynamic-fifth-option");
            });

            $("#remove-fifth-option").click(function () {
                removeLastField($(this), $("#remove-fifth-option"), ".dynamic-fifth-option");
            }); 
        });
        
        
        

    
//Turn in Config Calls Form
$(document).ready(function() {
    // Selector for the 'Config Calls' form
    var formSelector = '#Config-1';
    $(formSelector).submit(function(event) {
        // After form submission
        $('.call-progress').addClass('is-complete');
        $('#Tab-Link-2').trigger('click');
     
    });
   
});

$(document).ready(function() {
    // Selector for the 'Config Calls' form
    var formSelector2 = '#Config-2';

     $(formSelector2).submit(function(event) {
        // After form submission
        $('.date-progress').addClass('is-complete');
        $('#Tab-Link-3').trigger('click');
        
        });
});


 // Placeholder 
  window.onload = function() {
    document.querySelectorAll('input').forEach(function(input) {
      var dataPlaceholder = input.getAttribute('data-placeholder');
      if (dataPlaceholder) {
        input.placeholder = dataPlaceholder;
      }
    });
  };
