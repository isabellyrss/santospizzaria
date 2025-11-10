// Código simples para interatividade: carrinho, formulários e pequenas melhorias
document.addEventListener('DOMContentLoaded', function () {
    // Atualiza ano no rodapé
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // Menu toggle (mobile)
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      });
    }
  
    // Carrinho simples
    const addBtns = document.querySelectorAll('.add-btn');
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const DELIVERY_FEE = 8.00;
    let cart = [];
  
    function formatBRL(v){ return 'R$ ' + v.toFixed(2).replace('.', ','); }
  
    function renderCart(){
      if(!cartItemsEl) return;
      if(cart.length === 0){
        cartItemsEl.textContent = 'Nenhum item adicionado.';
        cartTotalEl.textContent = formatBRL(0);
        if(deliveryFeeEl) deliveryFeeEl.textContent = formatBRL(DELIVERY_FEE);
        return;
      }
      cartItemsEl.innerHTML = '';
      let sum = 0;
      cart.forEach((it, idx) => {
        sum += it.price * it.qty;
        const div = document.createElement('div');
        div.className = 'cart-row';
        div.innerHTML = `
          <div class="cart-row-left">
            <strong>${it.name}</strong> <span class="muted">x${it.qty}</span>
          </div>
          <div class="cart-row-right">
            <span>${formatBRL(it.price * it.qty)}</span>
            <button class="btn small remove" data-idx="${idx}">Remover</button>
          </div>
        `;
        cartItemsEl.appendChild(div);
      });
      const total = sum + DELIVERY_FEE;
      cartTotalEl.textContent = formatBRL(total);
      if(deliveryFeeEl) deliveryFeeEl.textContent = formatBRL(DELIVERY_FEE);
    }
  
    if(addBtns){
      addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const name = btn.dataset.name;
          const price = parseFloat(btn.dataset.price) || 0;
          const found = cart.find(i => i.name === name);
          if(found) found.qty += 1;
          else cart.push({name, price, qty:1});
          renderCart();
        });
      });
    }
  
    // Remover item do carrinho
    document.addEventListener('click', function(e){
      if(e.target && e.target.classList.contains('remove')){
        const idx = parseInt(e.target.dataset.idx);
        if(!isNaN(idx)) cart.splice(idx,1);
        renderCart();
      }
    });
  
    // Envio do pedido (simulado)
    const orderForm = document.getElementById('orderForm');
    if(orderForm){
      orderForm.addEventListener('submit', function(e){
        e.preventDefault();
        if(cart.length === 0){
          alert('Seu carrinho está vazio.');
          return;
        }
        // Simula envio: cria resumo
        const form = new FormData(orderForm);
        const summary = [];
        cart.forEach(it => summary.push(`${it.name} x${it.qty}`));
        const mensagem = `Pedido: ${summary.join(' | ')}\nCliente: ${form.get('name')}\nTel: ${form.get('phone')}\nMetodo: ${form.get('method')}\nTotal: ${cartTotalEl.textContent}`;
        // Aqui você pode integrar WhatsApp / API / e-mail
        alert('Pedido enviado com sucesso!\n\n' + mensagem);
        cart = [];
        renderCart();
        orderForm.reset();
      });
    }
  
    // Reservas (rodízio e locação) — simulação de envio
    const reserveRodizio = document.getElementById('reserveRodizio');
    if(reserveRodizio){
      reserveRodizio.addEventListener('submit', function(e){
        e.preventDefault();
        const data = new FormData(reserveRodizio);
        alert('Reserva de rodízio recebida!\n' + data.get('name') + ' — ' + data.get('date') + ' ' + data.get('time'));
        reserveRodizio.reset();
      });
    }
  
    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm){
      bookingForm.addEventListener('submit', function(e){
        e.preventDefault();
        const data = new FormData(bookingForm);
        alert('Solicitação de locação enviada!\n' + data.get('name') + ' — ' + data.get('date'));
        bookingForm.reset();
      });
    }
  });
  