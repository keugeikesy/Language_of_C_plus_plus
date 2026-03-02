Page({
    data: {
      cityName: "未选择",
      currentIndex: 0,
      navItems: [
        { name: '同城场馆', id: 'venue' },
        { name: '场馆赛事', id: 'event' },
        { name: '在线教学', id: 'course' },
        { name: '教练预约', id: 'coach' }
      ],
      
      // 轮播图数据
      swiperList: [
        {
          id: 1,
          image: '/images/swiperItem01.jpg',
        },
        {
          id: 2,
          image: '/images/swiperItem02.jpg',
        },
        {
          id: 3,
          image: '/images/swiperItem03.jpg',
        },
      ],
      
      // 同城场馆数据
      venueList: [
        {
          id: 1,
          name: '活力体育中心',
          address: '北京市朝阳区建国路88号',
          distance: 2.5,
          price: 120,
          image: ''
        },
        {
          id: 2,
          name: '动感健身俱乐部',
          address: '北京市海淀区中关村大街168号',
          distance: 3.2,
          price: 150,
          image: ''
        },
        {
          id: 3,
          name: '阳光羽毛球馆',
          address: '北京市西城区西直门外大街135号',
          distance: 4.1,
          price: 80,
          image: ''
        },
        {
          id: 4,
          name: '星辰游泳馆',
          address: '北京市东城区王府井大街256号',
          distance: 5.3,
          price: 100,
          image: ''
        }
      ],
  
      // 场馆赛事数据
      eventList: [
        {
          id: 1,
          name: '2026年北京市羽毛球公开赛',
          time: '2026年3月15日 09:00-17:00',
          location: '活力体育中心',
          month: '3月',
          day: '15',
          status: '报名中'
        },
        {
          id: 2,
          name: '春季篮球友谊赛',
          time: '2026年3月22日 14:00-18:00',
          location: '动感健身俱乐部',
          month: '3月',
          day: '22',
          status: '报名中'
        },
        {
          id: 3,
          name: '少儿游泳比赛',
          time: '2026年4月5日 10:00-16:00',
          location: '星辰游泳馆',
          month: '4月',
          day: '5',
          status: '报名中'
        },
        {
          id: 4,
          name: '冬季乒乓球锦标赛',
          time: '2026年2月28日 09:00-17:00',
          location: '阳光羽毛球馆',
          month: '2月',
          day: '28',
          status: '已结束'
        }
      ],
  
      // 在线教学数据
      courseList: [
        {
          id: 1,
          name: '羽毛球基础教学',
          teacher: '李教练',
          duration: 60,
          price: 199,
          image: ''
        },
        {
          id: 2,
          name: '篮球技巧提升',
          teacher: '王教练',
          duration: 90,
          price: 299,
          image: ''
        },
        {
          id: 3,
          name: '游泳入门课程',
          teacher: '张教练',
          duration: 120,
          price: 399,
          image: ''
        },
        {
          id: 4,
          name: '乒乓球进阶训练',
          teacher: '刘教练',
          duration: 75,
          price: 249,
          image: ''
        }
      ],
  
      // 教练预约数据
      coachList: [
        {
          id: 1,
          name: '李教练',
          specialty: '羽毛球专业教练',
          rating: 4.9,
          price: 200,
          avatar: ''
        },
        {
          id: 2,
          name: '王教练',
          specialty: '篮球专业教练',
          rating: 4.8,
          price: 250,
          avatar: ''
        },
        {
          id: 3,
          name: '张教练',
          specialty: '游泳专业教练',
          rating: 4.9,
          price: 180,
          avatar: ''
        },
        {
          id: 4,
          name: '刘教练',
          specialty: '乒乓球专业教练',
          rating: 4.7,
          price: 150,
          avatar: ''
        }
      ]
    },
  
    // onLoad: function() {
    //   // 页面加载时的初始化操作
    // },
    onShow: function(){
        var Nowcityname = wx.getStorageSync('saveCityName');
        if(Nowcityname)
        {
            this.setData({
                cityName: Nowcityname
            })
        }
    },
    // 切换标签页
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      });
  
      // 显示对应标签的提示
      const tabName = this.data.navItems[index].name;
      wx.showToast({
        title: `切换到${tabName}`,
        icon: 'none',
        duration: 1000
      });
    },
  
    // 预约教练
    reserveCoach(e) {
      const coach = e.currentTarget.dataset.coach;
      wx.showModal({
        title: '预约教练',
        content: `确认预约${coach.name}教练吗？\n专业：${coach.specialty}\n价格：¥${coach.price}/小时`,
        confirmText: '确认预约',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '预约成功！',
              icon: 'success',
              duration: 2000
            });
          }
        }
      });
    },
  
    // 轮播图点击事件
    onBannerTap(e) {
      const id = e.currentTarget.dataset.id;
      const banner = this.data.bannerList.find(item => item.id == id);
      
      if (banner) {
        wx.showToast({
          title: `点击了：${banner.title}`,
          icon: 'none',
          duration: 1000
        });
  
        // 可以在这里添加页面跳转逻辑
        // wx.navigateTo({
        //   url: banner.link
        // });
      }
    }
  });