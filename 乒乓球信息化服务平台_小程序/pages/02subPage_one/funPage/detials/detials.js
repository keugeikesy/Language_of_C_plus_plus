Page({
    data: {
      equipment: null
    },
  
    onLoad(options) {
      const id = parseInt(options.id);
      // 模拟从服务器获取器材详情
      const equipmentList = [
        {
          id: 1,
          name: '健身器材套装',
          brand: '品牌A',
          price: 1299,
          image: 'https://example.com/equipment1.jpg',
          isCollected: false,
          description: '这是一套完整的健身器材，包含多种训练设备，适合家庭使用。采用高品质材料制作，安全可靠，帮助您在家中就能进行全面的健身训练。'
        },
        {
          id: 2,
          name: '跑步机器材',
          brand: '品牌B',
          price: 2999,
          image: 'https://example.com/equipment2.jpg',
          isCollected: true,
          description: '专业级跑步机，具有多种运动模式和智能调节功能。静音设计，不影响他人，配备高清显示屏，实时显示运动数据。'
        },
        {
          id: 3,
          name: '哑铃套装',
          brand: '品牌C',
          price: 599,
          image: 'https://example.com/equipment3.jpg',
          isCollected: false,
          description: '可调节重量的哑铃套装，包含多种重量配置，适合不同强度的力量训练。人体工学设计，握感舒适，安全防滑。'
        },
        {
          id: 4,
          name: '瑜伽器材套装',
          brand: '品牌A',
          price: 399,
          image: 'https://example.com/equipment4.jpg',
          isCollected: false,
          description: '专业瑜伽器材套装，包含瑜伽垫、瑜伽球、瑜伽带等多种配件。环保材料制作，安全无毒，帮助您更好地进行瑜伽练习。'
        },
        {
          id: 5,
          name: '力量训练器材',
          brand: '品牌D',
          price: 1899,
          image: 'https://example.com/equipment5.jpg',
          isCollected: true,
          description: '多功能力量训练器材，可进行多种力量训练动作。稳固的结构设计，承重能力强，适合专业健身爱好者使用。'
        }
      ];
  
      const equipment = equipmentList.find(item => item.id === id);
      this.setData({
        equipment: equipment
      });
    },
  
    onCollect() {
      const equipment = {
        ...this.data.equipment,
        isCollected: !this.data.equipment.isCollected
      };
      
      this.setData({
        equipment: equipment
      });
      
      wx.showToast({
        title: equipment.isCollected ? '收藏成功' : '取消收藏',
        icon: 'success',
        duration: 1500
      });
    },
  
    onBuy() {
      wx.showModal({
        title: '确认购买',
        content: `您确定要购买${this.data.equipment.name}吗？价格：¥${this.data.equipment.price}`,
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
    }
  });