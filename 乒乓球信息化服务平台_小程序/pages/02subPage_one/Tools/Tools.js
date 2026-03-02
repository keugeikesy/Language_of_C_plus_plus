Page({
    data: {
      searchKeyword: '',
      selectedBrand: '',
      brands: [
        { id: 1, name: '红双喜' },
        { id: 2, name: '蝴蝶' },
        { id: 3, name: '多尼克' },
        { id: 4, name: '729友谊' },
        { id: 5, name: '斯蒂卡' }
      ],
      equipmentList: [
        {
          id: 1,
          name: '健身器材套装',
          brand: '品牌A',
          price: 1299,
          image: 'https://example.com/equipment1.jpg',
          isCollected: false
        },
        {
          id: 2,
          name: '跑步机器材',
          brand: '品牌B',
          price: 2999,
          image: 'https://example.com/equipment2.jpg',
          isCollected: true
        },
        {
          id: 3,
          name: '哑铃套装',
          brand: '品牌C',
          price: 599,
          image: 'https://example.com/equipment3.jpg',
          isCollected: false
        },
        {
          id: 4,
          name: '瑜伽器材套装',
          brand: '品牌A',
          price: 399,
          image: 'https://example.com/equipment4.jpg',
          isCollected: false
        },
        {
          id: 5,
          name: '力量训练器材',
          brand: '品牌D',
          price: 1899,
          image: 'https://example.com/equipment5.jpg',
          isCollected: true
        }
      ],
      filteredList: []
    },
  
    onLoad() {
      this.setData({
        filteredList: this.data.equipmentList
      });
    },
  
    onSearchInput(e) {
      this.setData({
        searchKeyword: e.detail.value
      });
    },
  
    onSearch() {
      this.filterEquipment();
    },
  
    onSelectBrand(e) {
      const brand = e.currentTarget.dataset.brand;
      this.setData({
        selectedBrand: brand
      });
      this.filterEquipment();
    },
  
    filterEquipment() {
      let filtered = this.data.equipmentList;
      
      // 品牌筛选
      if (this.data.selectedBrand) {
        filtered = filtered.filter(item => item.brand === this.data.selectedBrand);
      }
      
      // 搜索筛选
      if (this.data.searchKeyword) {
        const keyword = this.data.searchKeyword.toLowerCase();
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(keyword) || 
          item.brand.toLowerCase().includes(keyword)
        );
      }
      
      this.setData({
        filteredList: filtered
      });
    },
  
    onCollect(e) {
      const id = e.currentTarget.dataset.id;
      const equipmentList = this.data.equipmentList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isCollected: !item.isCollected
          };
        }
        return item;
      });
      
      this.setData({
        equipmentList: equipmentList
      });
      
      // 同时更新筛选后的列表
      this.filterEquipment();
      
      // 提示用户
      const equipment = equipmentList.find(item => item.id === id);
      wx.showToast({
        title: equipment.isCollected ? '收藏成功' : '取消收藏',
        icon: 'success',
        duration: 1500
      });
    },
  
    onBuy(e) {
      const id = e.currentTarget.dataset.id;
      const equipment = this.data.equipmentList.find(item => item.id === id);
      
      wx.showModal({
        title: '确认购买',
        content: `您确定要购买${equipment.name}吗？价格：¥${equipment.price}`,
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 1500
            });
          }
        }
      });
    },
  
    goToDetail(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/02subPage_one/funPage/detials/detials?id=${id}`
      });
    }
  });