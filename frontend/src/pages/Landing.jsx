const handleContactSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toISOString(),
      read: false
    };

    try {
      // 1. جلب وحفظ الرسائل في جميع المفاتيح المحتملة التي قد تستخدمها لوحة التحكم
      const keysToUpdate = ['admin_messages', 'contact_messages', 'messages', 'support_messages'];
      
      keysToUpdate.forEa\ch(key => {
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        localStorage.setItem(key, JSON.stringify([newMessage, ...existing]));
      });

      // 2. إطلاق حدث إشعار لكي تحدث لوحة التحكم نفسها فوراً إن كانت مفتوحة بنفس المتصفح
      window.dispatchEvent(new Event('storage'));

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsContactOpen(false);
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error("خطأ في حفظ الرسالة", error);
    }
  };
