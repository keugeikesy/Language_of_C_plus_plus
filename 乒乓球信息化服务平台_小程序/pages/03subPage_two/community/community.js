Page({
    data: {
      // 分类标签
      categories: [
        { id: 'all', name: '全部' },
        { id: 'news', name: '乒乓新闻' },
        { id: 'discussion', name: '话题讨论' },
        { id: 'event', name: '赛事活动' },
        { id: 'equipment', name: '器材分享' },
        { id: 'coach', name: '教练指导' }
      ],
      
      // 当前选中的分类
      currentCategory: 'all',
      
      // 帖子列表
      postList: [],
      
      // 加载状态
      loading: false,
      
      // 搜索关键词
      searchKeyword: '',
      
      // 分页信息
      page: 1,
      pageSize: 10,
      hasMore: true
    },
  
    onLoad() {
      // 页面加载时获取帖子列表
      this.loadPosts();
    },
  
    // 下拉刷新
    onPullDownRefresh() {
      this.refreshPosts();
    },
  
    // 上拉加载更多
    onReachBottom() {
      if (this.data.hasMore && !this.data.loading) {
        this.loadMorePosts();
      }
    },
  
    // 加载帖子列表
    loadPosts(isRefresh = false) {
      if (this.data.loading) return;
  
      this.setData({
        loading: true
      });
  
      // 模拟网络请求
      setTimeout(() => {
        try {
          // 模拟返回数据
          const newData = this.generateMockData(isRefresh);
          
          if (isRefresh) {
            this.setData({
              postList: newData,
              page: 1,
              hasMore: newData.length >= this.data.pageSize
            });
            wx.stopPullDownRefresh();
          } else {
            this.setData({
              postList: [...this.data.postList, ...newData],
              page: this.data.page + 1,
              hasMore: newData.length >= this.data.pageSize
            });
          }
  
        } catch (err) {
          wx.showToast({
            title: '加载失败，请重试',
            icon: 'none',
            duration: 2000
          });
        } finally {
          this.setData({
            loading: false
          });
        }
      }, 1500);
    },
  
    // 刷新帖子列表
    refreshPosts() {
      this.loadPosts(true);
    },
  
    // 加载更多帖子
    loadMorePosts() {
      this.loadPosts();
    },
  
    // 生成模拟数据
    generateMockData(isRefresh) {
      const data = [];
      const startId = isRefresh ? 1 : (this.data.page - 1) * this.data.pageSize + 1;
      
      // 模拟有时候返回空数据（用于测试空数据状态）
      if (Math.random() < 0.1 && isRefresh) {
        return [];
      }
  
      for (let i = 0; i < this.data.pageSize; i++) {
        const id = startId + i;
        const titles = [
          '2026年北京马拉松报名开始了！',
          '分享我的羽毛球训练心得',
          '如何选择适合自己的篮球鞋',
          '乒乓球发球技巧详解',
          '健身初学者应该注意什么',
          '游泳比赛的训练方法',
          '足球战术分析：433阵型的优缺点',
          '跑步减肥的正确姿势',
          '网球比赛规则详解',
          '瑜伽对运动员的好处'
        ];
  
        const contents = [
          '2026年北京马拉松报名已经开始了，今年的比赛将于10月29日举行，报名截止日期是8月31日。想要参加的朋友们抓紧时间报名了！',
          '打羽毛球已经有一年多了，总结了一些训练心得，希望对大家有所帮助。首先要注意的是握拍姿势，其次是步伐的灵活性，最后是击球的力度和角度。',
          '选择一双合适的篮球鞋非常重要，不仅能提高运动表现，还能保护脚部不受伤害。我来分享一下我的选择经验。',
          '乒乓球发球是非常重要的技术环节，一个好的发球可以直接得分。今天我来详细讲解一下乒乓球发球的技巧。',
          '很多健身初学者刚开始训练时都会犯一些错误，我来分享一些我认为初学者应该注意的事项。',
          '游泳比赛的训练方法有很多种，我来分享一下我平时的训练计划，希望对大家有所帮助。',
          '433阵型是足球比赛中比较常用的阵型之一，它的优点是进攻能力强，缺点是防守相对薄弱。',
          '跑步减肥是很多人选择的减肥方式，但是很多人跑步减肥效果不明显，可能是因为姿势不正确。',
          '网球比赛规则相对复杂，很多初学者不太了解，我来详细讲解一下网球比赛的规则。',
          '瑜伽对运动员的好处很多，不仅可以提高柔韧性，还可以帮助放松身心，缓解训练后的疲劳。'
        ];
  
        const authors = [
          {
            name: '运动爱好者',
            avatar: 'https://ui-avatars.com/api/?name=运动爱好者&background=random'
          },
          {
            name: '羽毛球教练',
            avatar: 'https://ui-avatars.com/api/?name=羽毛球教练&background=random'
          },
          {
            name: '篮球达人',
            avatar: 'https://ui-avatars.com/api/?name=篮球达人&background=random'
          },
          {
            name: '乒乓球高手',
            avatar: 'https://ui-avatars.com/api/?name=乒乓球高手&background=random'
          },
          {
            name: '健身教练',
            avatar: 'https://ui-avatars.com/api/?name=健身教练&background=random'
          }
        ];
  
        // 随机生成1-3张图片
        const imageCount = Math.floor(Math.random() * 3) + 1;
        const images = [];
        for (let j = 0; j < imageCount; j++) {
          images.push(`https://picsum.photos/id/${1000 + j + i}/400/400`);
        }
  
        data.push({
          id: id,
          title: titles[id % titles.length],
          content: contents[id % contents.length],
          author: authors[id % authors.length],
          time: this.formatTime(new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)),
          images: images,
          likeCount: Math.floor(Math.random() * 1000),
          commentCount: Math.floor(Math.random() * 200),
          collectCount: Math.floor(Math.random() * 150),
          liked: Math.random() < 0.3,
          collected: Math.random() < 0.2
        });
      }
  
      return data;
    },
  
    // 格式化时间
    formatTime(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
  
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    },
  
    // 切换分类
    switchCategory(e) {
      const category = e.currentTarget.dataset.category;
      this.setData({
        currentCategory: category,
        page: 1
      });
  
      // 重新加载数据
      this.loadPosts(true);
    },
  
    // 搜索输入
    onSearchInput(e) {
      this.setData({
        searchKeyword: e.detail.value
      });
    },
  
    // 搜索确认
    onSearchConfirm(e) {
      this.setData({
        searchKeyword: e.detail.value
      });
      this.onSearch();
    },
  
    // 搜索
    onSearch() {
      const keyword = this.data.searchKeyword.trim();
      if (!keyword) {
        wx.showToast({
          title: '请输入搜索关键词',
          icon: 'none',
          duration: 2000
        });
        return;
      }
  
      // 模拟搜索
      wx.showLoading({
        title: '搜索中...'
      });
  
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: `搜索到 ${Math.floor(Math.random() * 50) + 1} 条相关结果`,
          icon: 'none',
          duration: 2000
        });
      }, 1500);
    },
  
    // 点赞
    onLike(e) {
      const id = e.currentTarget.dataset.id;
      const postList = this.data.postList;
      const index = postList.findIndex(item => item.id === id);
      
      if (index !== -1) {
        const liked = postList[index].liked;
        const likeCount = postList[index].likeCount;
        
        postList[index].liked = !liked;
        postList[index].likeCount = liked ? likeCount - 1 : likeCount + 1;
        
        this.setData({
          postList: postList
        });
  
        // 显示提示
        wx.showToast({
          title: liked ? '取消点赞' : '点赞成功',
          icon: 'none',
          duration: 1500
        });
      }
    },
  
    // 评论
    onComment(e) {
      const id = e.currentTarget.dataset.id;
      this.navigateToDetail(id);
    },
  
    // 收藏
    onCollect(e) {
      const id = e.currentTarget.dataset.id;
      const postList = this.data.postList;
      const index = postList.findIndex(item => item.id === id);
      
      if (index !== -1) {
        const collected = postList[index].collected;
        const collectCount = postList[index].collectCount;
        
        postList[index].collected = !collected;
        postList[index].collectCount = collected ? collectCount - 1 : collectCount + 1;
        
        this.setData({
          postList: postList
        });
  
        // 显示提示
        wx.showToast({
          title: collected ? '取消收藏' : '收藏成功',
          icon: 'none',
          duration: 1500
        });
      }
    },
  
    // 分享帖子
    sharePost(e) {
      const id = e.currentTarget.dataset.id;
      const post = this.data.postList.find(item => item.id === id);
      
      if (post) {
        wx.showShareMenu({
          withShareTicket: true,
          menus: ['shareAppMessage', 'shareTimeline']
        });
      }
    },
  
    // 跳转到帖子详情
    navigateToDetail(id) {
      wx.navigateTo({
        url: `/pages/post-detail/post-detail?id=${id}`
      });
    },
  
    // 跳转到发布页面
    navigateToPublish() {
      wx.navigateTo({
        url: '/pages/03subPage_two/funPage/post/post'
      });
    }
  });