/* 
  Golfic Booking Engine
  Handles Calendar, Simulator Selection, and Slot Management
*/

document.addEventListener('DOMContentLoaded', () => {
    initBookingTabs();
    initCalendar();
    initSlotSelection();
});

/* --- Booking Flow Tabs --- */
function initBookingTabs() {
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const steps = document.querySelectorAll('.booking-step');
    const progress = document.querySelectorAll('.step-indicator');
    
    let currentStep = 0;
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                steps[currentStep].classList.remove('active');
                progress[currentStep].classList.remove('active');
                progress[currentStep].classList.add('completed');
                
                currentStep++;
                
                steps[currentStep].classList.add('active');
                progress[currentStep].classList.add('active');
            }
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                steps[currentStep].classList.remove('active');
                progress[currentStep].classList.remove('active');
                
                currentStep--;
                
                steps[currentStep].classList.add('active');
                progress[currentStep].classList.add('active');
                progress[currentStep].classList.remove('completed');
            }
        });
    });
}

/* --- Interactive Calendar --- */
function initCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        if (i === today.getDate()) day.classList.add('today', 'selected');
        if (i < today.getDate()) day.classList.add('disabled');
        
        day.innerHTML = `<span>${i}</span>`;
        
        if (i >= today.getDate()) {
            day.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
            });
        }
        
        calendarGrid.appendChild(day);
    }
}

/* --- Slot Selection --- */
function initSlotSelection() {
    const slots = document.querySelectorAll('.time-slot:not(.booked)');
    slots.forEach(slot => {
        slot.addEventListener('click', () => {
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
        });
    });
}
