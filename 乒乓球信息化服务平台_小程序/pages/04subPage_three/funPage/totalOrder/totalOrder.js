Page({
    data: {
      selectedFilter: 'all',
      filterOptions: [
        { label: '全部', value: 'all' },
        { label: '待付款', value: 'pending_payment' },
        { label: '待发货', value: 'pending_delivery' },
        { label: '待收货', value: 'pending_receipt' },
        { label: '已完成', value: 'completed' },
        { label: '已取消', value: 'cancelled' }
      ],
      orderList: [],
      loading: false,
      hasMore: true,
      page: 1,
      pageSize: 10
    },
  
    onLoad() {
      this.loadOrders();
    },
  
    onPullDownRefresh() {
      this.setData({
        page: 1,
        orderList: [],
        hasMore: true
      });
      
      this.loadOrders(() => {
        wx.stopPullDownRefresh();
      });
    },
  
    onReachBottom() {
      if (this.data.hasMore && !this.data.loading) {
        this.loadOrders();
      }
    },
  
    // 选择筛选条件
    onSelectFilter(e) {
      const filter = e.currentTarget.dataset.filter;
      this.setData({
        selectedFilter: filter,
        page: 1,
        orderList: [],
        hasMore: true
      });
      
      this.loadOrders();
    },
  
    // 加载订单
    loadOrders(callback) {
      if (this.data.loading) return;
  
      this.setData({ loading: true });
  
      // 模拟网络请求
      setTimeout(() => {
        const page = this.data.page;
        const pageSize = this.data.pageSize;
        const mockData = this.generateMockData(page, pageSize);
        
        const filteredData = this.filterOrderData(mockData);
        
        this.setData({
          orderList: page === 1 ? filteredData : [...this.data.orderList, ...filteredData],
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
    filterOrderData(data) {
      const { selectedFilter } = this.data;
      
      if (selectedFilter === 'all') {
        return data;
      }
      
      return data.filter(item => item.status === selectedFilter);
    },
  
    // 生成模拟数据
    generateMockData(page, pageSize) {
      const mockData = [];
      const statuses = ['pending_payment', 'pending_delivery', 'pending_receipt', 'completed', 'cancelled'];
      const products = [
        {
          productId: 1,
          name: '专业健身器材套装',
          spec: '标准配置',
          price: 1299,
          quantity: 1,
          image: 'https://example.com/product1.jpg'
        },
        {
          productId: 2,
          name: '智能跑步机',
          spec: '豪华版',
          price: 2999,
          quantity: 1,
          image: 'https://example.com/product2.jpg'
        },
        {
          productId: 3,
          name: '瑜伽训练套装',
          spec: '全套配件',
          price: 399,
          quantity: 2,
          image: 'https://example.com/product3.jpg'
        },
        {
          productId: 4,
          name: '哑铃套装',
          spec: '20kg',
          price: 599,
          quantity: 1,
          image: 'https://example.com/product4.jpg'
        }
      ];
      
      for (let i = 0; i < pageSize; i++) {
        const index = (page - 1) * pageSize + i;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const randomProducts = products.slice(0, Math.floor(Math.random() * 3) + 1);
        const totalAmount = randomProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
        
        mockData.push({
          orderId: `ORD${Date.now() + index}`,
          createTime: `2024-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
          status: status,
          products: randomProducts,
          totalAmount: totalAmount
        });
      }
      
      return mockData;
    },
  
    // 获取状态文本
    getStatusText(status) {
      switch (status) {
        case 'pending_payment':
          return '待付款';
        case 'pending_delivery':
          return '待发货';
        case 'pending_receipt':
          return '待收货';
        case 'completed':
          return '已完成';
        case 'cancelled':
          return '已取消';
        default:
          return '未知状态';
      }
    },
  
    // 取消订单
    cancelOrder(e) {
      const orderId = e.currentTarget.dataset.orderId;
      
      wx.showModal({
        title: '确认取消',
        content: '确定要取消这个订单吗？',
        success: (res) => {
          if (res.confirm) {
            // 模拟取消订单请求
            wx.showLoading({
              title: '取消中...'
            });
  
            setTimeout(() => {
              const orderList = this.data.orderList.map(order => {
                if (order.orderId === orderId) {
                  return {
                    ...order,
                    status: 'cancelled'
                  };
                }
                return order;
              });
              
              this.setData({ orderList });
              
              wx.hideLoading();
              wx.showToast({
                title: '订单已取消',
                icon: 'success'
              });
            }, 1000);
          }
        }
      });
    },
  
    // 支付订单
    payOrder(e) {
      const orderId = e.currentTarget.dataset.orderId;
      const order = this.data.orderList.find(order => order.orderId === orderId);
  
      wx.showModal({
        title: '确认支付',
        content: `确定要支付¥${order.totalAmount}吗？`,
        success: (res) => {
          if (res.confirm) {
            // 模拟支付请求
            wx.showLoading({
              title: '支付中...'
            });
  
            setTimeout(() => {
              // 这里可以调用微信支付API
              wx.hideLoading();
              wx.showToast({
                title: '支付成功',
                icon: 'success'
              });
  
              // 更新订单状态
              const orderList = this.data.orderList.map(order => {
                if (order.orderId === orderId) {
                  return {
                    ...order,
                    status: 'pending_delivery'
                  };
                }
                return order;
              });
              
              this.setData({ orderList });
            }, 1500);
          }
        }
      });
    },
  
    // 提醒发货
    remindDelivery(e) {
      wx.showToast({
        title: '已提醒商家发货',
        icon: 'success'
      });
    },
  
    // 确认收货
    confirmReceipt(e) {
      const orderId = e.currentTarget.dataset.orderId;
      
      wx.showModal({
        title: '确认收货',
        content: '确定已经收到商品了吗？',
        success: (res) => {
          if (res.confirm) {
            // 模拟确认收货请求
            wx.showLoading({
              title: '确认中...'
            });
  
            setTimeout(() => {
              const orderList = this.data.orderList.map(order => {
                if (order.orderId === orderId) {
                  return {
                    ...order,
                    status: 'completed'
                  };
                }
                return order;
              });
              
              this.setData({ orderList });
              
              wx.hideLoading();
              wx.showToast({
                title: '已确认收货',
                icon: 'success'
              });
            }, 1000);
          }
        }
      });
    },
  
    // 去评价
    goToReview(e) {
      const orderId = e.currentTarget.dataset.orderId;
      wx.navigateTo({
        url: '/pages/order-review/order-review?orderId=${orderId}'
      });
    },
  
    // 再次购买
    buyAgain(e) {
      const orderId = e.currentTarget.dataset.orderId;
      const order = this.data.orderList.find(order => order.orderId === orderId);
      
      // 将商品添加到购物车
      wx.showToast({
        title: '已添加到购物车',
        icon: 'success'
      });
    },
  
    // 查看订单详情
    goToDetail(e) {
      const orderId = e.currentTarget.dataset.orderId;
      wx.navigateTo({
        url: '/pages/order-detail/order-detail?orderId=${orderId}'
      });
    },
  
    // 查看商品详情
    goToProductDetail(e) {
      const productId = e.currentTarget.dataset.productId;
      wx.navigateTo({
        url: '/pages/product-detail/product-detail?id=${productId}'
      });
    },
  
    // 去购物
    goShopping() {
      wx.switchTab({
        url: '/pages/home/home'
      });
    }
  });