new Vue({
    el: '#app',
    data: {
      containerHeight: '300px',
      buttons: [],
      infoVisible: false,
      panelVisible: false,
      newNomName: '',
      newNomCost: '',
      selectedInfo: '',
      item: Object
    },
    mounted() {
      this.fetchNomenklatures();
    },
    methods: {      
      togglePanel() {
        this.panelVisible = !this.panelVisible;
      },

      async fetchNomenklatures() {
        try {
          const response = await fetch('/api/nomenklatures');
          const data = await response.json();
          this.buttons = data;
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      },

      async loadInfo(index) {
        try {
          const id = this.buttons[index].id;
          const response = await fetch(`/api/nomenklatures/${id}`);
          const data = await response.json();
          this.selectedInfo = data;
          this.infoVisible = true;
          this.containerHeight = '500px';
        } catch (error) {
          console.error('Ошибка при получении информации:', error);
        }
      },

      flattenProducts(product, depth = 0) {
        let result = [{
          name: product.name,
          quantity: product.quantity,
          cost: product.cost,
          totalCost: product.totalCost,
          depth: depth
        }];
      
        if (product.childProducts && product.childProducts.length > 0) {
          result = result.concat(...product.childProducts.map(child => this.flattenProducts(child, depth + 1)));
        }
      
        return result;
      },

      async postInfo() {
        try{
          const response = await fetch('/api/nomenklatures', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
              name: this.newNomName,
              cost: this.newNomCost
            })
          });
          this.fetchNomenklatures();
          this.newNomName = '';
          this.newNomCost = '';
          this.panelVisible = false;
        } catch(error){
          console.error('Ошибка при добавлении:', error);
        }
      }

    }
  });