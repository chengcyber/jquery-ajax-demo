

$(function() {

  /**
   * Inital get all orders and append to unorder list
   */
  var $orders = $('#orders');

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/orders',
    success: function(data) {
      console.log(data);
      $.each(data, function(key, value) {
        addOrder(value);
        // console.log(key, value);
      });
    },
    error: function(err) {
      console.log(err);
      alert(err.status + ' ' + err.statusText);
    }
  });
  
  /**
   * Add an order, trigger by clicking button
   */
  var $addBtn = $('#add-order');
  var $name = $('#name');
  var $drink = $('#drink');

  $addBtn.click(function(event) {
    // POST body 
    var order = {
      name: $name.val(),
      drink: $drink.val()
    }

    // POST request
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/orders',
      data: order,
      success: function(newOrder) {
        addOrder(newOrder);
      },
      error: function(err) {
        console.log(err);
        alert(err.status + ' ' + err.statusText);
      }
    });
  });

  /**
   * Delete an order by button click,
   * here is pitfall, async actions on js
   * not all delete button is loaded now
   */
  //  $('.deleteOrder').click(function(event) {
  //    ...
  //  })
  $orders.delegate('.deleteOrder', 'click', function(event) {

    // target li
    var $li = $(this).closest('li');

    // DELETE request
    $.ajax({
      type: 'DELETE',
      // url: 'http://localhost:3000/orders/' + event.target.getAttribute('data-id'),
      url: 'http://localhost:3000/orders/' + $li.attr('data-id'),
      success: function() {
        // $li.remove();
        $li.fadeOut(300, function() {
          $(this).remove();
        })
      }
    });
  });

  /**
   * Edit an order by click edit button to turn on edit mode
   * input value to edit order info
   * save to save this edit, cancel is cancel
   */
   $orders.delegate('.editOrder', 'click', function() {
     var $li = $(this).closest('li');
     $li.find('input.name').val( $li.find('span.name').html() );
     $li.find('input.drink').val( $li.find('span.drink').html() );
     $li.addClass('edit');
   });
   $orders.delegate('.cancelEdit', 'click', function() {
     var $li = $(this).closest('li');
     $li.removeClass('edit');
   })
   $orders.delegate('.saveOrder', 'click', function() {
     var $li = $(this).closest('li');
     var order = {
       name: $li.find('input.name').html(),
       drink: $li.find('input.drink').html()
     }

     // PUT request
     $.ajax({
       type: 'PUT',
       url: 'http://localhost:3000/orders/' + $li.attr('data-id'),
       success: function() {
         $li.find('span.name').html( $li.find('input.name').val() );
         $li.find('span.drink').html( $li.find('input.drink').val() );
         $li.removeClass('edit');
       },
       error: function(err) {
         alert(err.status + ' ' + err.statusText);
         $li.removeClass('edit');
       }
     })
   })

  /**
   * Append new order to list
   * import mustache template
   */
  // var orderTemplate = "<li>name: {{name}}, drink: {{drink}}" +
  // '<button data-id={{id}} class="pull-right btn-delete">Delete</button>' +
  // "</li>";
  /**
   * Move template to HTML file to make code more elegant
   */
  var orderTemplate = $('#orderTemplate').html();

  function addOrder(newOrder) {
    var $orders = $('#orders');
    // $orders.append('<li>name: ' + newOrder.name + ', drink: '+ newOrder.drink  + '</li>')
    $orders.append(Mustache.render(orderTemplate, newOrder));
  }

});