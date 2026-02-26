
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

// Event listener para botão confirmar
document.getElementById('confirm-button')?.addEventListener('click', function(e) {
  const errorMessage = document.getElementById('select-error');

  // Validação
  if (!selectedStoreData.phone) {
    errorMessage.style.display = 'block';
    return;
  }

  // Monta URL do WhatsApp
  const message = encodeURIComponent(`Olá, gostaria de fazer um pedido na ${selectedStoreData.storeName}`);
  const whatsappURL = `https://wa.me/${selectedStoreData.phone}?text=${message}`;

  // GTM Event: Clique no WhatsApp (Conversão)
  dataLayer.push({
    'event': 'whatsapp_click',
    'store_name': selectedStoreData.storeName,
    'conversion_type': 'lead_generation',
    'event_category': 'conversion',
    'event_action': 'whatsapp_contact',
    'value': 1
  });

  // Abre WhatsApp em nova aba
  window.open(whatsappURL, '_blank');

  // Fecha modal
  closeModal();
});

// Suporte a teclado: Escape fecha, Enter confirma
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

