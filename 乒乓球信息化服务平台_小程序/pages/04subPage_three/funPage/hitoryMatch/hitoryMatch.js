Page({
    data: {
      selectedFilter: 'all',
      filterOptions: [
        { label: '全部', value: 'all' },
        { label: '进行中', value: 'ongoing' },
        { label: '已完成', value: 'completed' }
      ],
      contestList: [],
      loading: false,
      hasMore: true,
      page: 1,
      pageSize: 10
    },
  
    onLoad() {
      this.loadContestHistory();
    },
  
    onPullDownRefresh() {
      this.setData({
        page: 1,
        contestList: [],
        hasMore: true
      });
      
      this.loadContestHistory(() => {
        wx.stopPullDownRefresh();
      });
    },
  
    onReachBottom() {
      if (this.data.hasMore && !this.data.loading) {
        this.loadContestHistory();
      }
    },
  
    // 选择筛选条件
    onSelectFilter(e) {
      const filter = e.currentTarget.dataset.filter;
      this.setData({
        selectedFilter: filter,
        page: 1,
        contestList: [],
        hasMore: true
      });
      
      this.loadContestHistory();
    },
  
    // 加载参赛历史
    loadContestHistory(callback) {
      if (this.data.loading) return;
  
      this.setData({ loading: true });
  
      // 模拟网络请求
      setTimeout(() => {
        const page = this.data.page;
        const pageSize = this.data.pageSize;
        const mockData = this.generateMockData(page, pageSize);
        
        const filteredData = this.filterContestData(mockData);
        
        this.setData({
          contestList: page === 1 ? filteredData : [...this.data.contestList, ...filteredData],
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
    filterContestData(data) {
      const { selectedFilter } = this.data;
      
      if (selectedFilter === 'all') {
        return data;
      }
      
      return data.filter(item => item.status === selectedFilter);
    },
  
    // 生成模拟数据
    generateMockData(page, pageSize) {
      const mockData = [];
      const statuses = ['ongoing', 'completed', 'upcoming'];
      const locations = ['北京', '上海', '广州', '深圳', '杭州', '成都'];
      
      for (let i = 0; i < pageSize; i++) {
        const index = (page - 1) * pageSize + i;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        mockData.push({
          id: index + 1,
          name: `第${index + 1}届全国大学生程序设计竞赛`,
          status: status,
          time: `2024-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
          location: locations[Math.floor(Math.random() * locations.length)],
          score: status === 'completed' ? (Math.floor(Math.random() * 100) + 1).toFixed(1) : '',
          rank: status === 'completed' ? Math.floor(Math.random() * 100) + 1 : '',
          total: status === 'completed' ? 200 : ''
        });
      }
      
      return mockData;
    },
  
    // 获取状态文本
    getStatusText(status) {
      switch (status) {
        case 'ongoing':
          return '进行中';
        case 'completed':
          return '已完成';
        case 'upcoming':
          return '即将开始';
        default:
          return '未知状态';
      }
    },
  
    // 查看比赛详情
    goToDetail(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/contest-detail/contest-detail?id=${id}`
      });
    }
  });