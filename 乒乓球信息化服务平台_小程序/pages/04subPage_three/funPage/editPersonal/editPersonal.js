Page({
    data: {
      userInfo: {
        avatar: 'https://example.com/default-avatar.png',
        nickname: '',
        gender: 0, // 0: 未知, 1: 男, 2: 女
        phone: '',
        introduction: ''
      },
      genderOptions: [
        { label: '未知', value: 0 },
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],
      genderIndex: 0,
      errors: {}
    },
  
    onLoad() {
      // 从本地存储或服务器获取用户信息
      this.loadUserInfo();
    },
  
    // 加载用户信息
    loadUserInfo() {
      // 模拟从本地存储获取用户信息
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({
          userInfo: userInfo,
          genderIndex: this.data.genderOptions.findIndex(
            item => item.value === userInfo.gender
          )
        });
      }
    },
  
    // 选择头像
    onChooseAvatar() {
      const that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePath = res.tempFilePaths[0];
          that.setData({
            'userInfo.avatar': tempFilePath
          });
          
          // 这里可以将头像上传到服务器
          that.uploadAvatar(tempFilePath);
        }
      });
    },
  
    // 上传头像到服务器
    uploadAvatar(filePath) {
      // 模拟上传头像
      wx.showLoading({
        title: '上传中...'
      });
      
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '头像上传成功',
          icon: 'success'
        });
      }, 1500);
    },
  
    // 昵称改变
    onNicknameChange(e) {
      this.setData({
        'userInfo.nickname': e.detail.value
      });
      this.clearError('nickname');
    },
  
    // 性别改变
    onGenderChange(e) {
      const index = e.detail.value;
      this.setData({
        genderIndex: index,
        'userInfo.gender': this.data.genderOptions[index].value
      });
      this.clearError('gender');
    },
  
    // 手机号改变
    onPhoneChange(e) {
      this.setData({
        'userInfo.phone': e.detail.value
      });
      this.clearError('phone');
    },
  
    // 个人简介改变
    onIntroductionChange(e) {
      this.setData({
        'userInfo.introduction': e.detail.value
      });
      this.clearError('introduction');
    },
  
    // 清除错误提示
    clearError(field) {
      if (this.data.errors[field]) {
        const errors = { ...this.data.errors };
        delete errors[field];
        this.setData({ errors });
      }
    },
  
    // 表单验证
    validateForm() {
      const { userInfo } = this.data;
      const errors = {};
  
      // 验证昵称
      if (!userInfo.nickname.trim()) {
        errors.nickname = '请输入昵称';
      } else if (userInfo.nickname.length > 20) {
        errors.nickname = '昵称不能超过20个字符';
      }
  
      // 验证手机号
      if (userInfo.phone) {
        const phoneReg = /^1[3-9]\d{9}$/;
        if (!phoneReg.test(userInfo.phone)) {
          errors.phone = '请输入正确的手机号';
        }
      }
  
      // 验证个人简介
      if (userInfo.introduction.length > 100) {
        errors.introduction = '个人简介不能超过100个字符';
      }
  
      this.setData({ errors });
      return Object.keys(errors).length === 0;
    },
  
    // 保存用户信息
    onSave() {
      if (!this.validateForm()) {
        return;
      }
  
      wx.showLoading({
        title: '保存中...'
      });
  
      // 模拟保存到服务器
      setTimeout(() => {
        // 保存到本地存储
        wx.setStorageSync('userInfo', this.data.userInfo);
        
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
  
        // 返回上一页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }, 1500);
    }
  });