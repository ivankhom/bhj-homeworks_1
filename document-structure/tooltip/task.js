const tooltipElements = document.querySelectorAll('.has-tooltip');

function createTooltip(element, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  return tooltip;
}

function removeAllTooltips() {
  const existingTooltips = document.querySelectorAll('.tooltip');
  existingTooltips.forEach(tooltip => tooltip.remove());
}

function getTooltipPosition(element, position) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
  const positions = {
    top: {
      left: rect.left + scrollLeft,
      top: rect.top + scrollTop - 30
    },
    bottom: {
      left: rect.left + scrollLeft,
      top: rect.bottom + scrollTop + 5
    },
    left: {
      left: rect.left + scrollLeft - 200,
      top: rect.top + scrollTop
    },
    right: {
      left: rect.right + scrollLeft + 5,
      top: rect.top + scrollTop
    }
  };
  
  return positions[position] || positions.bottom;
}

tooltipElements.forEach(element => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    
    removeAllTooltips();
    
    const tooltipText = element.getAttribute('title');
    const tooltip = createTooltip(element, tooltipText);
    
    const position = element.dataset.position || 'bottom';
    const coordinates = getTooltipPosition(element, position);
    
    tooltip.style.left = coordinates.left + 'px';
    tooltip.style.top = coordinates.top + 'px';
    
    tooltip.classList.add('tooltip_active');
    
    document.body.appendChild(tooltip);
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.classList.contains('has-tooltip')) {
    removeAllTooltips();
  }
});