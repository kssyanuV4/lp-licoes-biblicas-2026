
$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight() + 150;

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.material', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.section-title', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.material-title', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.section-subtitle', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.wpp-chamada', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })
});

function initSwiper(groupName) {
    const swiper = new Swiper(`.slide-content-${groupName}`, {
            slidesPerView: 3,
            spaceBetween: 25,
            loop: true,
            centerSlide: true,
            fade: true,
            grabCursor: true,
            pagination: {
            el: `.swiper-pagination-${groupName}`,
            clickable: true,
            dynamicBullets: true,
        },
            navigation: {
            nextEl: `.swiper-button-next-${groupName}`,
            prevEl: `.swiper-button-prev-${groupName}`,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            520: {
                slidesPerView: 2,
            },
            950: {
                slidesPerView: 3,
            },
        },
        // GTM Event: Tracking de mudança de slide
        on: {
            slideChange: function () {
                dataLayer.push({
                    'event': 'carousel_interaction',
                    'material_category': groupName,
                    'slide_index': this.realIndex,
                    'interaction_type': 'slide_change',
                    'event_category': 'engagement',
                    'event_action': 'carousel_navigation'
                });
            }
        }
    });
    
    return swiper;
}

['infantil', 'adolescente', 'adulto', 'novosconvertidos', 'periodicos'].forEach(initSwiper);

function toggleAccordion(id) {
    const content = document.getElementById(id);
    const title = event.currentTarget;
    const icon = title.querySelector('.accordion-icon');

    const isOpen = content.style.display === 'block';

    content.style.display = isOpen ? 'none' : 'block';

    if (icon) {
        icon.classList.toggle('fa-chevron-down', isOpen);
        icon.classList.toggle('fa-chevron-up', !isOpen);
    }

    // GTM Event: Visualização de sumário
    if (!isOpen) { // Só dispara quando abre, não quando fecha
        dataLayer.push({
            'event': 'summary_view',
            'category': id,
            'engagement_type': 'content_expansion',
            'event_category': 'engagement',
            'event_action': 'summary_view'
        });
    }
}

const modal = document.getElementById('store_modal');
const buttons = document.querySelectorAll('.phone_button');
const select = document.getElementById('store_select');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Bloqueia scroll da página

        // GTM Event: Modal de seleção de loja aberto
        dataLayer.push({
            'event': 'modal_open',
            'modal_type': 'store_selection',
            'page_location': window.location.href,
            'event_category': 'engagement',
            'event_action': 'modal_open'
        });
    });
});

// GTM Event: Tracking de scroll depth
let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
};

$(window).scroll(function() {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height();
    const winHeight = $(window).height();
    const scrollPercent = Math.round(scrollTop / (docHeight - winHeight) * 100);

    // Tracking de marcos de scroll
    if (scrollPercent >= 25 && !scrollDepthTracked[25]) {
        scrollDepthTracked[25] = true;
        dataLayer.push({
            'event': 'scroll_depth',
            'scroll_percentage': 25,
            'event_category': 'engagement',
            'event_action': 'scroll_depth'
        });
    }
    if (scrollPercent >= 50 && !scrollDepthTracked[50]) {
        scrollDepthTracked[50] = true;
        dataLayer.push({
            'event': 'scroll_depth',
            'scroll_percentage': 50,
            'event_category': 'engagement',
            'event_action': 'scroll_depth'
        });
    }
    if (scrollPercent >= 75 && !scrollDepthTracked[75]) {
        scrollDepthTracked[75] = true;
        dataLayer.push({
            'event': 'scroll_depth',
            'scroll_percentage': 75,
            'event_category': 'engagement',
            'event_action': 'scroll_depth'
        });
    }
    if (scrollPercent >= 100 && !scrollDepthTracked[100]) {
        scrollDepthTracked[100] = true;
        dataLayer.push({
            'event': 'scroll_depth',
            'scroll_percentage': 100,
            'event_category': 'engagement',
            'event_action': 'scroll_depth'
        });
    }
});

// GTM Event: Tracking de cliques em links de navegação
$('a[href^="#"]').click(function() {
    const targetSection = $(this).attr('href');
    dataLayer.push({
        'event': 'navigation_click',
        'target_section': targetSection,
        'link_text': $(this).text().trim(),
        'event_category': 'navigation',
        'event_action': 'internal_link_click'
    });
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restaura scroll da página
    select.value = "";
    document.getElementById('confirm-button').disabled = true;
    document.getElementById('select-error').style.display = 'none';
}

// Variáveis para armazenar dados da loja selecionada
let selectedStoreData = {
    phone: '',
    storeName: ''
};

document.getElementById('store_select')?.addEventListener('change', function () {
  const select = this;
  const phone = select.value;
  const storeName = select.options[select.selectedIndex].text;
  const confirmButton = document.getElementById('confirm-button');
  const errorMessage = document.getElementById('select-error');

  // Esconde mensagem de erro
  errorMessage.style.display = 'none';

  if (!phone) {
    confirmButton.disabled = true;
    selectedStoreData.phone = '';
    selectedStoreData.storeName = '';
    return;
  }

  // Habilita botão e armazena dados
  confirmButton.disabled = false;
  selectedStoreData.phone = phone;
  selectedStoreData.storeName = storeName;

  // GTM Event: Loja selecionada
  dataLayer.push({
    'event': 'store_selected',
    'store_name': storeName,
    'store_phone': phone,
    'event_category': 'engagement',
    'event_action': 'store_selection'
  });
});

// Event listener para botão confirmar — abre WhatsApp direto
document.getElementById('confirm-button')?.addEventListener('click', function(e) {
  const errorMessage = document.getElementById('select-error');

  // Validação
  if (!selectedStoreData.phone) {
    errorMessage.style.display = 'block';
    return;
  }

  // Monta URL do WhatsApp e abre
  const message = encodeURIComponent(`Olá, gostaria de fazer um pedido na ${selectedStoreData.storeName}`);
  const whatsappURL = `https://wa.me/${selectedStoreData.phone}?text=${message}`;

  // GTM Event: WhatsApp click
  dataLayer.push({
    'event': 'whatsapp_click',
    'store_name': selectedStoreData.storeName,
    'store_phone': selectedStoreData.phone,
    'event_category': 'conversion',
    'event_action': 'whatsapp_contact',
    'value': 1
  });

  window.open(whatsappURL, '_blank');
  closeModal();
});

// Suporte a teclado: Escape fecha, Enter confirma (store_modal original)
document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'Enter' && !document.getElementById('confirm-button').disabled) {
            document.getElementById('confirm-button').click();
        }
    }
});

// ── CPAD Lead Capture — Fluxo identico a LP Lojas (2 etapas) ─────────────────────
var CPAD_API_URL = 'https://v0-saa-s-landing-page.vercel.app/api/leads';

var CPAD_STORES = [
  { name: "CPAD BELO HORIZONTE (MG)", phone: "553134314000" },
  { name: "CPAD BRAS\u00CDLIA (DF)", phone: "556121074761" },
  { name: "CPAD CURITIBA (PR)", phone: "5541987138566" },
  { name: "CPAD JARDIM GUADALUPE (RJ)", phone: "552133692727" },
  { name: "CPAD MANAUS (AM)", phone: "559221266950" },
  { name: "CPAD MARANH\u00C3O (MA)", phone: "559821088401" },
  { name: "CPAD MEGASTORE RIO", phone: "5521993416369" },
  { name: "CPAD NATAL (RN)", phone: "5584987956613" },
  { name: "CPAD NITER\u00D3I (RJ)", phone: "552126204318" },
  { name: "CPAD NOVA IGUA\u00C7U (RJ)", phone: "5521998838884" },
  { name: "CPAD MEGASTORE (PE)", phone: "558121284750" },
  { name: "CPAD SALVADOR (BA)", phone: "557121045300" },
  { name: "CPAD S\u00C3O PAULO (SP)", phone: "551121982700" },
  { name: "CPAD VICENTE DECARVALHO (RJ)", phone: "5521983851372" },
  { name: "CPAD VILA VELHA (ES)", phone: "5527992593338" },
  { name: "CPAD PORTO VELHO (RO)", phone: "556932292808" },
  { name: "CPAD MACEI\u00D3 (AL)", phone: "558235120376" },
  { name: "CPAD PORTO ALEGRE (RS)", phone: "555132240664" },
];

var CPAD_DDD_MAP = {
  "11": ["CPAD S\u00C3O PAULO (SP)"], "12": ["CPAD S\u00C3O PAULO (SP)"], "13": ["CPAD S\u00C3O PAULO (SP)"],
  "14": ["CPAD S\u00C3O PAULO (SP)"], "15": ["CPAD S\u00C3O PAULO (SP)"], "16": ["CPAD S\u00C3O PAULO (SP)"],
  "17": ["CPAD S\u00C3O PAULO (SP)"], "18": ["CPAD S\u00C3O PAULO (SP)"], "19": ["CPAD S\u00C3O PAULO (SP)"],
  "21": ["CPAD MEGASTORE RIO","CPAD JARDIM GUADALUPE (RJ)","CPAD NITER\u00D3I (RJ)","CPAD NOVA IGUA\u00C7U (RJ)","CPAD VICENTE DECARVALHO (RJ)"],
  "22": ["CPAD MEGASTORE RIO"], "24": ["CPAD MEGASTORE RIO"],
  "27": ["CPAD VILA VELHA (ES)"], "28": ["CPAD VILA VELHA (ES)"],
  "31": ["CPAD BELO HORIZONTE (MG)"], "32": ["CPAD BELO HORIZONTE (MG)"], "33": ["CPAD BELO HORIZONTE (MG)"],
  "34": ["CPAD BELO HORIZONTE (MG)"], "35": ["CPAD BELO HORIZONTE (MG)"], "37": ["CPAD BELO HORIZONTE (MG)"],
  "38": ["CPAD BELO HORIZONTE (MG)"],
  "41": ["CPAD CURITIBA (PR)"], "42": ["CPAD CURITIBA (PR)"], "43": ["CPAD CURITIBA (PR)"],
  "44": ["CPAD CURITIBA (PR)"], "45": ["CPAD CURITIBA (PR)"], "46": ["CPAD CURITIBA (PR)"],
  "47": ["CPAD CURITIBA (PR)"], "48": ["CPAD PORTO ALEGRE (RS)"], "49": ["CPAD CURITIBA (PR)"],
  "51": ["CPAD PORTO ALEGRE (RS)"], "53": ["CPAD PORTO ALEGRE (RS)"], "54": ["CPAD PORTO ALEGRE (RS)"],
  "55": ["CPAD PORTO ALEGRE (RS)"],
  "61": ["CPAD BRAS\u00CDLIA (DF)"], "62": ["CPAD BRAS\u00CDLIA (DF)"], "63": ["CPAD MARANH\u00C3O (MA)"],
  "64": ["CPAD BRAS\u00CDLIA (DF)"], "65": ["CPAD BRAS\u00CDLIA (DF)"], "66": ["CPAD BRAS\u00CDLIA (DF)"],
  "67": ["CPAD S\u00C3O PAULO (SP)"], "68": ["CPAD PORTO VELHO (RO)"], "69": ["CPAD PORTO VELHO (RO)"],
  "71": ["CPAD SALVADOR (BA)"], "73": ["CPAD SALVADOR (BA)"], "74": ["CPAD SALVADOR (BA)"],
  "75": ["CPAD SALVADOR (BA)"], "77": ["CPAD SALVADOR (BA)"], "79": ["CPAD SALVADOR (BA)"],
  "81": ["CPAD MEGASTORE (PE)"], "82": ["CPAD MACEI\u00D3 (AL)"], "83": ["CPAD MEGASTORE (PE)"],
  "84": ["CPAD NATAL (RN)"], "85": ["CPAD NATAL (RN)"], "86": ["CPAD MARANH\u00C3O (MA)"],
  "87": ["CPAD MEGASTORE (PE)"], "88": ["CPAD NATAL (RN)"], "89": ["CPAD MARANH\u00C3O (MA)"],
  "91": ["CPAD MANAUS (AM)"], "92": ["CPAD MANAUS (AM)"], "93": ["CPAD MANAUS (AM)"],
  "94": ["CPAD MANAUS (AM)"], "95": ["CPAD MANAUS (AM)"], "96": ["CPAD MANAUS (AM)"],
  "97": ["CPAD MANAUS (AM)"], "98": ["CPAD MARANH\u00C3O (MA)"], "99": ["CPAD MARANH\u00C3O (MA)"],
};

function cpadGetNearbyStores(telefone) {
  var ddd = telefone.replace(/\D/g, '').substring(0, 2);
  return CPAD_DDD_MAP[ddd] || [];
}

function cpadApplyMask(input) {
  var v = input.value.replace(/\D/g, '');
  if (v.length > 11) v = v.substring(0, 11);
  if (v.length <= 10) {
    v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else {
    v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }
  input.value = v;
}

function cpadDetectDevice() {
  var ua = navigator.userAgent;
  if (/Tablet|iPad/i.test(ua)) return 'tablet';
  if (/Mobi|Android/i.test(ua)) return 'mobile';
  return 'desktop';
}

function cpadSalvarUtms() {
  var p = new URLSearchParams(window.location.search);
  var utms = {
    utm_source: p.get('utm_source'),
    utm_medium: p.get('utm_medium'),
    utm_campaign: p.get('utm_campaign'),
    utm_content: p.get('utm_content'),
    utm_term: p.get('utm_term'),
  };
  if (Object.values(utms).some(Boolean)) {
    sessionStorage.setItem('cpad_utms', JSON.stringify(utms));
  }
}
cpadSalvarUtms();

function cpadObterUtms() {
  try { return JSON.parse(sessionStorage.getItem('cpad_utms') || '{}'); } catch(e) { return {}; }
}

// Estado do modal
var cpadStep = 1;
var cpadSelectedStore = null;

function cpadOpenModal() {
  cpadStep = 1;
  cpadSelectedStore = null;
  document.getElementById('cpad-lead-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.getElementById('cpad-step1').style.display = 'block';
  document.getElementById('cpad-step2').style.display = 'none';
  document.getElementById('cpad-nome').value = '';
  document.getElementById('cpad-telefone').value = '';
  document.getElementById('cpad-dot1').style.background = '#fff';
  document.getElementById('cpad-dot2').style.background = 'rgba(255,255,255,0.4)';
  document.getElementById('cpad-modal-title').textContent = 'Seus dados';
  cpadUpdateStep1Btn();
  setTimeout(function() { document.getElementById('cpad-nome').focus(); }, 100);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'modal_open', modal_type: 'lead_capture', campanha: 'licoes-biblicas' });
}

function cpadCloseModal() {
  document.getElementById('cpad-lead-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function cpadUpdateStep1Btn() {
  var nome = document.getElementById('cpad-nome').value.trim();
  var tel = document.getElementById('cpad-telefone').value.replace(/\D/g, '');
  var valid = nome.length >= 2 && tel.length === 11;
  var btn = document.getElementById('cpad-continuar-btn');
  btn.disabled = !valid;
  btn.style.opacity = valid ? '1' : '0.4';
  btn.style.cursor = valid ? 'pointer' : 'not-allowed';
}

function cpadGoStep2() {
  var nome = document.getElementById('cpad-nome').value.trim();
  var telefone = document.getElementById('cpad-telefone').value;
  if (nome.length < 2 || telefone.replace(/\D/g, '').length !== 11) return;

  cpadStep = 2;
  document.getElementById('cpad-step1').style.display = 'none';
  document.getElementById('cpad-step2').style.display = 'block';
  document.getElementById('cpad-dot1').style.background = 'rgba(255,255,255,0.4)';
  document.getElementById('cpad-dot2').style.background = '#fff';
  document.getElementById('cpad-modal-title').textContent = 'Escolha sua loja';

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'lead_form_step1',
    ddd: telefone.replace(/\D/g, '').substring(0, 2),
    campanha: 'licoes-biblicas',
  });

  cpadRenderStores(telefone);
}

function cpadRenderStores(telefone) {
  var nearbyNames = cpadGetNearbyStores(telefone);
  var nearby = CPAD_STORES.filter(function(s) { return nearbyNames.indexOf(s.name) !== -1; });
  var others = CPAD_STORES.filter(function(s) { return nearbyNames.indexOf(s.name) === -1; });

  var storeSelect = document.getElementById('cpad-store-select');
  storeSelect.innerHTML = '<option value="">Escolha a loja mais proxima</option>';

  if (nearby.length > 0) {
    var grpNearby = document.createElement('optgroup');
    grpNearby.label = 'Proximas de voce';
    nearby.forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = s.name;
      opt.dataset.phone = s.phone;
      grpNearby.appendChild(opt);
    });
    storeSelect.appendChild(grpNearby);
  }

  if (others.length > 0) {
    var grpOthers = document.createElement('optgroup');
    grpOthers.label = 'Outras lojas';
    others.forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = s.name;
      opt.dataset.phone = s.phone;
      grpOthers.appendChild(opt);
    });
    storeSelect.appendChild(grpOthers);
  }

  cpadSelectedStore = null;
  cpadUpdateWhatsAppBtn();
}

function cpadUpdateWhatsAppBtn() {
  var btn = document.getElementById('cpad-whatsapp-btn');
  var valid = !!cpadSelectedStore;
  btn.disabled = !valid;
  btn.style.opacity = valid ? '1' : '0.4';
  btn.style.cursor = valid ? 'pointer' : 'not-allowed';
}

async function cpadHandleWhatsApp() {
  if (!cpadSelectedStore) return;

  var nome = document.getElementById('cpad-nome').value.trim();
  var telefone = document.getElementById('cpad-telefone').value;
  var digits = telefone.replace(/\D/g, '');
  var ddd = digits.substring(0, 2);
  var mensagem = 'Ol\u00e1! Meu nome \u00e9 ' + nome + '. Vim atrav\u00e9s do an\u00fancio da CPAD e gostaria de fazer um pedido.';
  var whatsappUrl = 'https://wa.me/' + cpadSelectedStore.phone + '?text=' + encodeURIComponent(mensagem);
  var utms = cpadObterUtms();

  var btn = document.getElementById('cpad-whatsapp-btn');
  btn.disabled = true;
  btn.textContent = 'Aguarde...';

  var payload = {
    nome: nome,
    telefone: telefone,
    ddd: ddd,
    loja_nome: cpadSelectedStore.name,
    loja_numero: cpadSelectedStore.phone,
    mensagem_enviada: mensagem,
    campanha: 'licoes-biblicas',
    utm_source: utms.utm_source || null,
    utm_medium: utms.utm_medium || null,
    utm_campaign: utms.utm_campaign || null,
    utm_content: utms.utm_content || null,
    utm_term: utms.utm_term || null,
    device_type: cpadDetectDevice(),
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
  };

  try {
    var res = await fetch(CPAD_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_captured',
        campanha: 'licoes-biblicas',
        store_name: cpadSelectedStore.name,
        ddd: ddd,
      });
    }
  } catch (e) {
    console.warn('CPAD lead capture error:', e);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'whatsapp_click',
    store_name: cpadSelectedStore.name,
    campanha: 'licoes-biblicas',
  });

  window.open(whatsappUrl, '_blank');
  cpadCloseModal();
}

// ── CPAD Lead Modal Event Listeners ──────────────────────────────────
document.getElementById('cpad-nome')?.addEventListener('input', cpadUpdateStep1Btn);
document.getElementById('cpad-telefone')?.addEventListener('input', function() {
  cpadApplyMask(this);
  cpadUpdateStep1Btn();
});
document.getElementById('cpad-continuar-btn')?.addEventListener('click', cpadGoStep2);
document.getElementById('cpad-voltar-btn')?.addEventListener('click', function() {
  cpadStep = 1;
  document.getElementById('cpad-step1').style.display = 'block';
  document.getElementById('cpad-step2').style.display = 'none';
  document.getElementById('cpad-dot1').style.background = '#fff';
  document.getElementById('cpad-dot2').style.background = 'rgba(255,255,255,0.4)';
  document.getElementById('cpad-modal-title').textContent = 'Seus dados';
});
document.getElementById('cpad-store-select')?.addEventListener('change', function() {
  var opt = this.options[this.selectedIndex];
  if (opt.value) {
    cpadSelectedStore = { name: opt.value, phone: opt.dataset.phone };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'store_selected', store_name: opt.value, campanha: 'licoes-biblicas' });
  } else {
    cpadSelectedStore = null;
  }
  cpadUpdateWhatsAppBtn();
});
document.getElementById('cpad-whatsapp-btn')?.addEventListener('click', cpadHandleWhatsApp);
document.getElementById('cpad-close-btn')?.addEventListener('click', cpadCloseModal);
document.getElementById('cpad-lead-modal')?.addEventListener('click', function(e) {
  if (e.target === this) cpadCloseModal();
});
document.addEventListener('keydown', function(e) {
  if (document.getElementById('cpad-lead-modal')?.style.display === 'flex') {
    if (e.key === 'Escape') cpadCloseModal();
    if (e.key === 'Enter' && cpadStep === 1) {
      var nome = document.getElementById('cpad-nome').value.trim();
      var tel = document.getElementById('cpad-telefone').value.replace(/\D/g, '');
      if (nome.length >= 2 && tel.length === 11) cpadGoStep2();
    }
  }
});

// Interceptar TODOS os botoes WhatsApp para o novo fluxo de lead capture
document.querySelectorAll('.phone_button').forEach(function(btn) {
  btn.replaceWith(btn.cloneNode(true)); // remove listeners antigos
});
document.querySelectorAll('.phone_button').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    cpadOpenModal();
  });
});

