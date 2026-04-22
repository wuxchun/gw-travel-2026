// GW旅行战术计划 - 特种部队终端交互脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化标签页切换
    initTabSwitching();
    
    // 初始化时间轴动画
    initTimelineAnimation();
    
    // 初始化战术终端效果
    initTacticalEffects();
    
    // 显示加载完成状态
    setTimeout(() => {
        updateStatus('任务系统已上线', 'green');
        console.log('GW旅行战术计划终端已启动 - 所有系统正常');
    }, 1000);
});

// 标签页切换功能
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 默认显示第一个标签页
    if (tabButtons.length > 0 && tabContents.length > 0) {
        // 确保至少有一个标签页是活动的
        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab) {
            tabContents[0].classList.add('active');
            tabButtons[0].classList.add('active');
        }
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 移除所有按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 添加active类到当前按钮
            this.classList.add('active');
            
            // 隐藏所有标签内容
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // 显示当前标签内容
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
                
                // 更新状态显示
                updateTabStatus(tabId);
                
                // 播放切换音效（模拟）
                playTabSound();
            }
        });
    });
}

// 更新状态显示
function updateTabStatus(tabId) {
    const statusMap = {
        'preparation': '准备清单检查中',
        'day1': '4月30日行程分析',
        'day2': '5月1日拉练模拟',
        'guide': '战术指南加载'
    };
    
    const statusText = statusMap[tabId] || '任务进行中';
    updateStatus(statusText, 'amber');
}

// 更新状态指示器
function updateStatus(text, color) {
    const statusElement = document.querySelector('.mr-4.text-sm span:nth-child(2)');
    const indicator = document.querySelector('.w-3.h-3');
    
    if (statusElement) {
        statusElement.textContent = text;
        
        // 根据颜色设置状态指示器
        if (color === 'green') {
            statusElement.className = 'ml-2 text-green-300';
            if (indicator) {
                indicator.className = 'w-3 h-3 bg-green-500 rounded-full animate-pulse';
            }
        } else if (color === 'amber') {
            statusElement.className = 'ml-2 text-amber-300';
            if (indicator) {
                indicator.className = 'w-3 h-3 bg-amber-500 rounded-full animate-pulse';
            }
        } else if (color === 'red') {
            statusElement.className = 'ml-2 text-red-300';
            if (indicator) {
                indicator.className = 'w-3 h-3 bg-red-500 rounded-full animate-pulse';
            }
        }
    }
}

// 时间轴动画
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // 使用Intersection Observer实现滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 设置初始状态并开始观察
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        observer.observe(item);
    });
}

// 战术终端效果
function initTacticalEffects() {
    // 添加点击效果到时间轴项目
    const timelineContents = document.querySelectorAll('.timeline-content');
    timelineContents.forEach(content => {
        content.addEventListener('click', function() {
            this.style.borderColor = 'var(--tactical-green)';
            this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
            
            setTimeout(() => {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }, 500);
        });
    });
    
    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 数字键1-4切换标签页
        if (e.key >= '1' && e.key <= '4') {
            const tabIndex = parseInt(e.key) - 1;
            const tabButtons = document.querySelectorAll('.tab-btn');
            
            if (tabButtons[tabIndex]) {
                tabButtons[tabIndex].click();
                
                // 显示快捷键反馈
                showShortcutFeedback(`切换到标签页 ${e.key}`);
            }
        }
        
        // ESC键重置状态
        if (e.key === 'Escape') {
            updateStatus('任务准备就绪', 'green');
        }
    });
    
    // 添加移动设备触摸反馈
    if ('ontouchstart' in window) {
        document.querySelectorAll('button, .timeline-content').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
}

// 播放标签切换音效（模拟）
function playTabSound() {
    // 在实际应用中，这里可以播放音频文件
    // 现在只是模拟一个控制台日志
    console.log('标签切换音效播放');
}

// 显示快捷键反馈
function showShortcutFeedback(text) {
    // 创建一个临时反馈元素
    const feedback = document.createElement('div');
    feedback.textContent = text;
    feedback.style.position = 'fixed';
    feedback.style.bottom = '20px';
    feedback.style.right = '20px';
    feedback.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    feedback.style.color = 'var(--tactical-green)';
    feedback.style.padding = '10px 15px';
    feedback.style.borderRadius = '5px';
    feedback.style.border = '1px solid var(--tactical-green)';
    feedback.style.fontFamily = "'Share Tech Mono', monospace";
    feedback.style.fontSize = '14px';
    feedback.style.zIndex = '10000';
    feedback.style.opacity = '0';
    feedback.style.transition = 'opacity 0.3s';
    
    document.body.appendChild(feedback);
    
    // 淡入
    setTimeout(() => {
        feedback.style.opacity = '1';
    }, 10);
    
    // 淡出并移除
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 2000);
}

// 设备检测和优化
function detectDevice() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        console.log('移动设备检测：优化触摸交互');
    } else {
        document.body.classList.add('desktop-device');
        console.log('桌面设备检测：启用键盘快捷键');
    }
}

// 初始化设备检测
detectDevice();