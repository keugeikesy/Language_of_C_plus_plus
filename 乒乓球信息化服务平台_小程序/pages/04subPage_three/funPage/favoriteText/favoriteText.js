Page({
    data: {
      selectedFilter: 'all',
      filterOptions: [
        { label: '全部', value: 'all' },
        { label: '技术', value: 'technology' },
        { label: '生活', value: 'life' },
        { label: '娱乐', value: 'entertainment' },
        { label: '体育', value: 'sports' }
      ],
      postList: [],
      loading: false,
      hasMore: true,
      page: 1,
      pageSize: 10
    },
  
    onLoad() {
      this.loadFavoritePosts();
    },
  
    onPullDownRefresh() {
      this.setData({
        page: 1,
        postList: [],
        hasMore: true
      });
      
      this.loadFavoritePosts(() => {
        wx.stopPullDownRefresh();
      });
    },
  
    onReachBottom() {
      if (this.data.hasMore && !this.data.loading) {
        this.loadFavoritePosts();
      }
    },
  
    // 选择筛选条件
    onSelectFilter(e) {
      const filter = e.currentTarget.dataset.filter;
      this.setData({
        selectedFilter: filter,
        page: 1,
        postList: [],
        hasMore: true
      });
      
      this.loadFavoritePosts();
    },
  
    // 加载收藏帖子
    loadFavoritePosts(callback) {
      if (this.data.loading) return;
  
      this.setData({ loading: true });
  
      // 模拟网络请求
      setTimeout(() => {
        const page = this.data.page;
        const pageSize = this.data.pageSize;
        const mockData = this.generateMockData(page, pageSize);
        
        const filteredData = this.filterPostData(mockData);
        
        this.setData({
          postList: page === 1 ? filteredData : [...this.data.postList, ...filteredData],
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
    filterPostData(data) {
      const { selectedFilter } = this.data;
      
      if (selectedFilter === 'all') {
        return data;
      }
      
      return data.filter(item => item.category === selectedFilter);
    },
  
    // 生成模拟数据
    generateMockData(page, pageSize) {
      const mockData = [];
      const categories = ['technology', 'life', 'entertainment', 'sports'];
      const authors = [
        { name: '技术达人', avatar: 'https://example.com/avatar1.jpg' },
        { name: '生活博主', avatar: 'https://example.com/avatar2.jpg' },
        { name: '娱乐小编', avatar: 'https://example.com/avatar3.jpg' },
        { name: '体育记者', avatar: 'https://example.com/avatar4.jpg' }
      ];
      
      for (let i = 0; i < pageSize; i++) {
        const index = (page - 1) * pageSize + i;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const author = authors[Math.floor(Math.random() * authors.length)];
        
        mockData.push({
          postId: `POST${Date.now() + index}`,
          title: `这是一篇${this.getCategoryText(category)}类的文章标题`,
          summary: '这是文章的摘要内容，包含了文章的主要信息和要点。摘要通常是文章内容的简短概括，帮助读者快速了解文章的主要内容。',
          category: category,
          author: author,
          createTime: `2024-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
          likeCount: Math.floor(Math.random() * 1000),
          commentCount: Math.floor(Math.random() * 100),
          images: [
            'https://example.com/post1.jpg',
            'https://example.com/post2.jpg'
          ].slice(0, Math.floor(Math.random() * 2) + 1)
        });
      }
      
      return mockData;
    },
  
    // 获取分类文本
    getCategoryText(category) {
      switch (category) {
        case 'technology':
          return '技术';
        case 'life':
          return '生活';
        case 'entertainment':
          return '娱乐';
        case 'sports':
          return '体育';
        default:
          return '未知';
      }
    },
  
    // 取消收藏
    onCancelCollect(e) {
      const postId = e.currentTarget.dataset.id;
      
      wx.showModal({
        title: '确认取消',
        content: '确定要取消收藏这篇帖子吗？',
        success: (res) => {
          if (res.confirm) {
            // 模拟取消收藏请求
            wx.showLoading({
              title: '取消中...'
            });
  
            setTimeout(() => {
              const postList = this.data.postList.filter(post => post.postId !== postId);
              this.setData({ postList });
              
              wx.hideLoading();
              wx.showToast({
                title: '已取消收藏',
                icon: 'success'
              });
            }, 1000);
          }
        }
      });
    },
  
    // 查看帖子详情
    goToDetail(e) {
      const postId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/post-detail/post-detail?id=${postId}`
      });
    },
  
    // 去浏览
    goBrowse() {
      wx.switchTab({
        url: '/pages/home/home'
      });
    }
  });