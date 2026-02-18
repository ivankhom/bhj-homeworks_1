const book = document.getElementById('book');

const fontSizeControls = document.querySelectorAll('.book__control_font-size .font-size');
const colorControls = document.querySelectorAll('.book__control_color .color');
const bgControls = document.querySelectorAll('.book__control_background .color');

fontSizeControls.forEach(control => {
  control.addEventListener('click', (event) => {
    event.preventDefault();
    
    fontSizeControls.forEach(item => {
      item.classList.remove('font-size_active');
    });
    
    control.classList.add('font-size_active');
    
    book.classList.remove('book_fs-small', 'book_fs-big');
    
    const size = control.dataset.size;
    if (size === 'small') {
      book.classList.add('book_fs-small');
    } else if (size === 'big') {
      book.classList.add('book_fs-big');
    }
  });
});

colorControls.forEach(control => {
  control.addEventListener('click', (event) => {
    event.preventDefault();
    
    colorControls.forEach(item => {
      item.classList.remove('color_active');
    });
    
    control.classList.add('color_active');
    
    book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');
    
    const color = control.dataset.textColor;
    if (color) {
      book.classList.add(`book_color-${color}`);
    }
  });
});

bgControls.forEach(control => {
  control.addEventListener('click', (event) => {
    event.preventDefault();
    
    bgControls.forEach(item => {
      item.classList.remove('color_active');
    });
    
    control.classList.add('color_active');
    
    book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');
    
    const bgColor = control.dataset.bgColor;
    if (bgColor) {
      book.classList.add(`book_bg-${bgColor}`);
    }
  });
});