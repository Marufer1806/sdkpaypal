paypal
  .Buttons({
    
    createOrder: function (data, actions) {
      return fetch("api/orders", {
        method: "post",
        
      }).then((response) => response.json())
        .then((order) => order.id);
    },
    
    onApprove: function (data, actions) {
      return fetch(`api/orders/${data.orderID}/capture`, {
        method: "post",
      })
        .then((response) => response.json())
        .then((orderData) => {
             console.log(
            "Captured",
            orderData,
            JSON.stringify(orderData, null, 2)
          );
          const transaction = orderData.purchase_units[0].payments.captures[0];
          alert(`Transaction ${transaction.status}: ${transaction.id}
            See console for all available details
          `);
        });
    },
  })
  .render("#paypal-button-container");