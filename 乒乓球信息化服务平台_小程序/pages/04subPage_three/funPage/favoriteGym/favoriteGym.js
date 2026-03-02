Page({
    data: {
      selectedFilter: 'all',
      filterOptions: [
        { label: '全部', value: 'all' },
        { label: '体育馆', value: 'stadium' },
        { label: '游泳馆', value: 'swimming' },
        { label: '健身房', value: 'gym' },
        { label: '羽毛球馆', value: 'badminton' },
        { label: '篮球场', value: 'basketball' }
      ],
      venueList: [],
      loading: false,
      hasMore: true,
      page: 1,
      pageSize: 10
    },
  
    onLoad() {
      this.loadFavoriteVenues();
    },
  
    onPullDownRefresh() {
      this.setData({
        page: 1,
        venueList: [],
        hasMore: true
      });
      
      this.loadFavoriteVenues(() => {
        wx.stopPullDownRefresh();
      });
    },
  
    onReachBottom() {
      if (this.data.hasMore && !this.data.loading) {
        this.loadFavoriteVenues();
      }
    },
  
    // 选择筛选条件
    onSelectFilter(e) {
      const filter = e.currentTarget.dataset.filter;
      
      // 添加选中动画
      this.setData({
        selectedFilter: filter,
        page: 1,
        venueList: [],
        hasMore: true
      });
      
      // 延迟加载数据，让动画更明显
      setTimeout(() => {
        this.loadFavoriteVenues();
      }, 200);
    },
  
    // 加载收藏场馆
    loadFavoriteVenues(callback) {
      if (this.data.loading) return;
  
      this.setData({ loading: true });
  
      // 模拟网络请求
      setTimeout(() => {
        const page = this.data.page;
        const pageSize = this.data.pageSize;
        const mockData = this.generateMockData(page, pageSize);
        
        const filteredData = this.filterVenueData(mockData);
        
        this.setData({
          venueList: page === 1 ? filteredData : [...this.data.venueList, ...filteredData],
          loading: false,
          page: page + 1,
          hasMore: filteredData.length === pageSize
        });
  
        if (callback) {
          callback();
        }
      }, 1500);
    },
  
    // 根据筛选条件过滤数据
    filterVenueData(data) {
      const { selectedFilter } = this.data;
      
      if (selectedFilter === 'all') {
        return data;
      }
      
      return data.filter(item => item.category === selectedFilter);
    },
  
    // 生成模拟数据
    generateMockData(page, pageSize) {
      const mockData = [];
      const categories = ['stadium', 'swimming', 'gym', 'badminton', 'basketball'];
      const features = ['免费停车', '24小时营业', '专业教练', '淋浴设施', '免费WiFi', '空调开放', '储物柜', '饮用水'];
      
      for (let i = 0; i < pageSize; i++) {
        const index = (page - 1) * pageSize + i;
        const category = categories[Math.floor(Math.random() * categories.length)];
        
        // 随机选择2-4个特色
        const selectedFeatures = [];
        const featureCount = Math.floor(Math.random() * 3) + 2;
        for (let j = 0; j < featureCount; j++) {
          const randomFeature = features[Math.floor(Math.random() * features.length)];
          if (!selectedFeatures.includes(randomFeature)) {
            selectedFeatures.push(randomFeature);
          }
        }
        
        // 生成随机评分（3.0-5.0分，保留一位小数）
        const rating = Math.floor(Math.random() * 21) / 2 + 3;
        
        mockData.push({
          venueId: `VENUE${Date.now() + index}`,
          name: `${this.getCategoryText(category)}${index + 1}馆`,
          category: category,
          image: `https://example.com/${category}${Math.floor(Math.random() * 4) + 1}.jpg`,
          rating: rating,
          reviewCount: Math.floor(Math.random() * 1000) + 100,
          address: `${['朝阳区', '海淀区', '西城区', '东城区', '丰台区'][Math.floor(Math.random() * 5)]}${Math.floor(Math.random() * 100) + 1}号`,
          price: Math.floor(Math.random() * 200) + 50, // 50-250元
          features: selectedFeatures,
          location: {
            latitude: 39.9 + Math.random() * 0.2,
            longitude: 116.4 + Math.random() * 0.2
          }
        });
      }
      
      return mockData;
    },
  
    // 获取分类文本
    getCategoryText(category) {
      switch (category) {
        case 'stadium':
          return '体育馆';
        case 'swimming':
          return '游泳馆';
        case 'gym':
          return '健身房';
        case 'badminton':
          return '羽毛球馆';
        case 'basketball':
          return '篮球场';
        default:
          return '场馆';
      }
    },
  
    // 取消收藏
    onCancelCollect(e) {
      const venueId = e.currentTarget.dataset.id;
      
      wx.showModal({
        title: '确认取消',
        content: '确定要取消收藏这个场馆吗？',
        confirmText: '取消收藏',
        confirmColor: '#ff4d4f',
        success: (res) => {
          if (res.confirm) {
            // 模拟取消收藏请求
            wx.showLoading({
              title: '取消中...'
            });
  
            setTimeout(() => {
              const venueList = this.data.venueList.filter(venue => venue.venueId !== venueId);
              this.setData({ venueList });
              
              wx.hideLoading();
              wx.showToast({
                title: '已取消收藏',
                icon: 'success',
                duration: 2000
              });
            }, 1000);
          }
        }
      });
    },
  
    // 导航到场馆
    navigateToVenue(e) {
      const venueId = e.currentTarget.dataset.id;
      const venue = this.data.venueList.find(venue => venue.venueId === venueId);
      
      wx.openLocation({
        latitude: venue.location.latitude,
        longitude: venue.location.longitude,
        name: venue.name,
        address: venue.address,
        scale: 18,
        success: () => {
          wx.showToast({
            title: '导航已打开',
            icon: 'success'
          });
        },
        fail: () => {
          wx.showToast({
            title: '导航失败，请检查权限',
            icon: 'none'
          });
        }
      });
    },
  
    // 查看场馆详情
    goToDetail(e) {
      const venueId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/venue-detail/venue-detail?id=${venueId}'
      });
    },
  
    // 去浏览
    goBrowse() {
      wx.switchTab({
        url: '/pages/venue-list/venue-list'
      });
    }
  });