Page({
    data: {
      // 用户信息
      userInfo: {
        avatar: 'https://ui-avatars.com/api/?name=张三&background=random',
        name: '张三',
        level: 5,
        signature: '热爱运动，享受健康生活',
        eventCount: 12,
        orderCount: 8,
        favoriteCount: 24
      },
      
      // 订单数量统计
      pendingOrderCount: 2,
      shippedOrderCount: 3
    },
  
    onLoad() {
      // 页面加载时获取用户信息
      this.loadUserInfo();
    },
  
    // 加载用户信息
    loadUserInfo() {
      // 模拟从服务器获取用户信息
      setTimeout(() => {
        // 这里可以替换为真实的API请求
        const userInfo = {
          avatar: 'https://ui-avatars.com/api/?name=张三&background=random',
          name: '张三',
          signature: '热爱运动，享受健康生活',
          eventCount: 12,
          orderCount: 8,
          favoriteCount: 24
        };
  
        this.setData({
          userInfo: userInfo
        });
      }, 1000);
    },
  
    // 编辑个人资料
    editProfile() {
      wx.showModal({
        title: '编辑资料',
        content: '跳转到编辑个人资料页面',
        confirmText: '确定',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            // 跳转到编辑个人资料页面
            wx.navigateTo({
              url: '/pages/04subPage_three/funPage/editPersonal/editPersonal'
            });
          }
        }
      });
    },
  
    // 显示统计信息
    showStats(type) {
      let title = '';
      let content = '';
  
      switch (type) {
        case 'events':
          title = '参赛统计';
          content = `您已经参加了 ${this.data.userInfo.eventCount} 场赛事`;
          break;
        case 'orders':
          title = '订单统计';
          content = `您已经完成了 ${this.data.userInfo.orderCount} 个订单`;
          break;
        case 'favorites':
          title = '收藏统计';
          content = `您已经收藏了 ${this.data.userInfo.favoriteCount} 个内容`;
          break;
      }
  
      wx.showToast({
        title: content,
        icon: 'none',
        duration: 2000
      });
    },
  
    // 导航到其他页面
    navigateTo() {
      wx.navigateTo({
        url: '/pages/04subPage_three/funPage/favoriteGym/favoriteGym'
        });
    },
  
    // 退出登录
    logout() {
      wx.showModal({
        title: '退出登录',
        content: '确定要退出登录吗？',
        confirmText: '退出',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            // 清除用户信息
            wx.removeStorageSync('userInfo');
            
            // 跳转到登录页面
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
        }
      });
    }
  });