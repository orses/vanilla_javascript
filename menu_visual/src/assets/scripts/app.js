(() => {
  const menu = [
    {
      id: 1,
      title: 'buttermilk pancakes',
      category: 'breakfast',
      price: 15.99,
      img: './data/images/item-1.jpeg',
      desc: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed ",
    },
    {
      id: 2,
      title: 'diner double',
      category: 'lunch',
      price: 13.99,
      img: './data/images/item-2.jpeg',
      desc: 'vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats ',
    },
    {
      id: 3,
      title: 'godzilla milkshake',
      category: 'shakes',
      price: 6.99,
      img: './data/images/item-3.jpeg',
      desc: 'ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.',
    },
    {
      id: 4,
      title: 'country delight',
      category: 'breakfast',
      price: 20.99,
      img: './data/images/item-4.jpeg',
      desc: 'Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, ',
    },
    {
      id: 5,
      title: 'egg attack',
      category: 'lunch',
      price: 22.99,
      img: './data/images/item-5.jpeg',
      desc: "franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up ",
    },
    {
      id: 6,
      title: 'oreo dream',
      category: 'shakes',
      price: 18.99,
      img: './data/images/item-6.jpeg',
      desc: 'Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday',
    },
    {
      id: 7,
      title: 'bacon overflow',
      category: 'breakfast',
      price: 8.99,
      img: './data/images/item-7.jpeg',
      desc: 'carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird ',
    },
    {
      id: 8,
      title: 'american classic',
      category: 'lunch',
      price: 12.99,
      img: './data/images/item-8.jpeg',
      desc: 'on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  ',
    },
    {
      id: 9,
      title: 'quarantine buddy',
      category: 'shakes',
      price: 16.99,
      img: './data/images/item-9.jpeg',
      desc: 'skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.',
    },
  ];

  const getCategories = data => {
    const items = data.map(item => item.category);
    return [...new Set(items)];
  };

  const makeItems = data => {
    const items = data.map(
      item => `<article class="menu-item">
      <img
      alt="A pancake with strawberry"
      class="photo"
      src="${item.img}"
      />
      <div class="item-info">
      <header>
      <h3 class="item__header">${item.title}</h3>
      <h4 class="price">${item.price}</h4>
      </header>
      <p class="item-text">${item.desc}</p>
      </div>
      </article>`
    );
    return items.join('\n');
  };

  const makeFilters = options => {
    const filters = options.map(
      option =>
        `<button class="filter-btn" data-filter="${option}" type="button">${option}</button>`
    );
    return filters.join('');
  };

  const renderData = () => {
    // load and display default items data
    const items = makeItems(menu);
    const displayItems = document.querySelector('.section-center');
    displayItems.innerHTML = items;

    // loadn and display filter options
    const categories = getCategories(menu);
    categories.unshift('all');
    const filters = makeFilters(categories);
    const displayFilters = document.querySelector('.btn-container');
    displayFilters.innerHTML = filters;

    // filter functionality
    displayFilters.addEventListener('click', e => {
      e.preventDefault();
      const category = e.target.dataset.filter;
      if (!category) return;
      const menuItems = menu.filter(item => item.category === category);
      displayItems.innerHTML = makeItems(category === 'all' ? menu : menuItems);
    });
  };

  window.addEventListener('DOMContentLoaded', renderData);
})();
