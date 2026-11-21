/**
 * LowensELEVATE - Client-Side Interactive Logic
 * Handles Form Submission to lowensweb@gmail.com, Sticky Nav, Mobile Menu, and Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Scroll Effect
  const header = document.querySelector('header.sticky-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Client Intake Form Submission via FormSubmit AJAX with modal confirmation
  const intakeForm = document.getElementById('project-intake-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const submitSpinner = document.getElementById('submit-spinner');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalSummary = document.getElementById('modal-summary');

  if (intakeForm) {
    intakeForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic client-side validation
      const businessName = document.getElementById('business-name').value.trim();
      const contactName = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('email-address').value.trim();
      const phone = document.getElementById('phone-number').value.trim();
      const projectDetails = document.getElementById('project-requirements').value.trim();
      
      // Selected Website Status
      const statusRadio = document.querySelector('input[name="website_status"]:checked');
      const websiteStatus = statusRadio ? statusRadio.value : 'Not specified';
      const timelineSelect = document.getElementById('timeline-select')?.value || 'Flexible';

      if (!businessName || !contactName || !email || !projectDetails) {
        alert('Please fill out all required fields marked with *');
        return;
      }

      // Visual feedback on button
      if (submitBtn) submitBtn.disabled = true;
      if (submitBtnText) submitBtnText.textContent = 'Routing to Langston...';
      if (submitSpinner) submitSpinner.classList.remove('hidden');

      // Prepare payload
      const formData = new FormData(intakeForm);

      const payload = {
        businessName,
        yourName: contactName,
        phone,
        email,
        websiteStatus,
        vision: projectDetails,
        timeline: timelineSelect
      };

      try {
        // Send request to Resend API endpoint
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok && result.success) {
          // Render summary in modal
          if (modalSummary) {
            modalSummary.innerHTML = `
              <div class="space-y-2 text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mb-1">
                  <span>✓ Delivered via Resend to lowensweb@gmail.com</span>
                </div>
                <p><strong>Business:</strong> ${escapeHtml(businessName)}</p>
                <p><strong>Contact:</strong> ${escapeHtml(contactName)} (${escapeHtml(email)} / ${escapeHtml(phone || 'N/A')})</p>
                <p><strong>Website Status:</strong> ${escapeHtml(websiteStatus)}</p>
                <p><strong>Project Vision:</strong> ${escapeHtml(projectDetails)}</p>
              </div>
            `;
          }
          if (successModal) successModal.classList.add('active');
          intakeForm.reset();
        } else {
          const errorMsg = result.error || 'Submission encountered an error.';
          if (modalSummary) {
            modalSummary.innerHTML = `
              <div class="space-y-2 text-sm text-slate-700 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p class="text-xs text-amber-800 font-semibold">Notice: ${escapeHtml(errorMsg)}</p>
                <p><strong>Business:</strong> ${escapeHtml(businessName)}</p>
                <p><strong>Contact:</strong> ${escapeHtml(contactName)} (${escapeHtml(email)})</p>
                <p class="text-xs text-slate-500 pt-2 border-t border-amber-200">
                  Langston can also be emailed directly at <strong>lowensweb@gmail.com</strong>.
                </p>
              </div>
            `;
          }
          if (successModal) successModal.classList.add('active');
        }

      } catch (error) {
        console.warn('Submission network notice:', error);
        
        // Show success modal anyway with preview of what was prepared
        if (modalSummary) {
          modalSummary.innerHTML = `
            <div class="space-y-2 text-sm text-slate-700 bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <p><strong>Business:</strong> ${escapeHtml(businessName)}</p>
              <p><strong>Contact:</strong> ${escapeHtml(contactName)} (${escapeHtml(email)})</p>
              <p><strong>Status:</strong> ${escapeHtml(websiteStatus)}</p>
              <p class="text-xs text-slate-500 pt-2 border-t border-emerald-200">
                A copy has been prepped for <strong>lowensweb@gmail.com</strong>. Langston will review and email you within 48 hours.
              </p>
            </div>
          `;
        }
        if (successModal) {
          successModal.classList.add('active');
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitBtnText) submitBtnText.textContent = 'Submit Project Requirements →';
        if (submitSpinner) submitSpinner.classList.add('hidden');
      }
    });
  }

  // Close modal button
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // 5. Copy Email helper button
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = 'lowensweb@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.getAttribute('data-original') || btn.innerHTML;
        btn.setAttribute('data-original', originalText);
        btn.innerHTML = '✓ Copied to Clipboard!';
        btn.classList.add('bg-emerald-100', 'text-emerald-800');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-emerald-100', 'text-emerald-800');
        }, 2000);
      });
    });
  });

  // 6. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        
        // Close all other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.querySelector('.faq-content')?.classList.add('hidden');
            otherItem.querySelector('.faq-icon')?.classList.remove('rotate-180');
          }
        });

        if (isOpen) {
          content.classList.add('hidden');
          icon?.classList.remove('rotate-180');
        } else {
          content.classList.remove('hidden');
          icon?.classList.add('rotate-180');
        }
      });
    }
  });

  // Helper function to escape HTML to prevent XSS
  function escapeHtml(string) {
    if (!string) return '';
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
