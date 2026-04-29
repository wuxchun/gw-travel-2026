// GW旅行战术计划 - 特种部队终端交互脚本
// 所有初始化在文件末尾统一执行

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
        'equipment': '战术物资整备系统',
        'guide': '战术指南加载',
        'transport': '交通行程查询中'
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

// ==========================================
// 战术物资整备 - 装备清单交互
// ==========================================

function initEquipmentChecklist() {
    const checkboxes = document.querySelectorAll('.equip-checkbox');
    const progressBar = document.getElementById('equipment-progress-bar');
    const progressText = document.getElementById('equipment-progress-text');
    const countText = document.getElementById('equipment-count-text');
    
    if (!checkboxes.length || !progressBar) return;
    
    const total = checkboxes.length;
    
    // 从 localStorage 恢复状态
    checkboxes.forEach((cb, index) => {
        const saved = localStorage.getItem(`equip_${index}`);
        if (saved === 'checked') {
            cb.checked = true;
        }
    });
    
    // 更新进度
    function updateProgress() {
        const checked = document.querySelectorAll('.equip-checkbox:checked').length;
        const percent = Math.round((checked / total) * 100);
        
        progressBar.style.width = percent + '%';
        progressText.textContent = percent + '%';
        countText.textContent = `${checked} / ${total} 项已核对`;
        
        // 进度条颜色变化
        if (percent === 100) {
            progressBar.className = 'h-full bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-full transition-all duration-500';
            progressText.className = 'text-green-400 font-share-tech text-sm';
            progressText.textContent = '✓ 100% · 整备完成！';
        } else if (percent >= 50) {
            progressBar.className = 'h-full bg-gradient-to-r from-green-600 via-amber-500 to-green-400 rounded-full transition-all duration-500';
        } else {
            progressBar.className = 'h-full bg-gradient-to-r from-green-600 via-amber-500 to-green-400 rounded-full transition-all duration-500';
        }
    }
    
    // 绑定事件
    checkboxes.forEach((cb, index) => {
        cb.addEventListener('change', function() {
            // 保存到 localStorage
            localStorage.setItem(`equip_${index}`, this.checked ? 'checked' : '');
            updateProgress();
            
            // 战术反馈音效（模拟）
            if (this.checked) {
                console.log('装备已标记: ' + (this.nextElementSibling?.nextElementSibling?.querySelector('.equip-item-name')?.textContent || ''));
            }
        });
    });
    
    // 初始更新
    updateProgress();
}

// 初始化设备检测
detectDevice();

// ==========================================
// Leaflet 地图功能 - 战术路书 v2.0
// ==========================================

// 精确坐标数据（通过 Overpass API 查询获取）
const COORDS = {
    // 4月30日 - 尾白川/诹访湖区域
    '小淵沢駅': [35.8615, 138.3167],
    '尾白川渓谷 駐車場': [35.7973, 138.2983],
    '竹宇駒ヶ岳神社': [35.7947, 138.2871],
    '神蛇滝': [35.7861, 138.2664],
    '千ヶ淵': [35.7909, 138.2741],
    '上諏訪駅': [36.0486, 138.1144],
    '諏訪湖': [36.0483, 138.1133],
    '立石公園': [36.0583, 138.1033],
    '松本駅': [36.2308, 137.9642],
    'ALPICO PLAZA HOTEL': [36.2315, 137.9630],
    
    // 5月1日 - 上高地区域
    '新島々駅': [36.1950, 137.8550],
    '大正池': [36.2284, 137.6197],
    '田代池': [36.2357, 137.6244],
    '河童橋': [36.2488, 137.6378],
    '明神池': [36.2540, 137.6638],
    '徳沢': [36.2600, 137.6900],
    '上高地バスターミナル': [36.2450, 137.6310],
    
    // 其他
    '両国': [35.6950, 139.7930],
    '新宿': [35.6895, 139.7004],
    '御茶ノ水': [35.6995, 139.7650]
};

// ==========================================
// 4月30日 尾白川环线路线
// ==========================================
// 去程：駐車場 → 竹宇駒ヶ岳神社 → 千ヶ淵 → 神蛇滝（瀑布折返）
// 回程（尾根道/山脊撤退路线）：神蛇滝 → 山脊路 → 駐車場

// 去程路线（沿溪谷）
const ROUTE_DAY1_GO = [
    [35.7973, 138.2983], // 駐車場
    [35.7947, 138.2871], // 竹宇駒ヶ岳神社
    [35.7909, 138.2741], // 千ヶ淵
    [35.7861, 138.2664], // 神蛇滝（折返点）
];

// 回程路线（尾根道/山脊撤退路线 - 虚线）
const ROUTE_DAY1_RETREAT = [
    [35.7861, 138.2664], // 神蛇滝
    [35.7880, 138.2700], // 山脊入口
    [35.7915, 138.2780], // 尾根道中段
    [35.7940, 138.2850], // 尾根道高处
    [35.7973, 138.2983], // 駐車場
];

// 整体行程路线（骑行+火车）
const ROUTE_DAY1_TRANSIT = [
    [35.8615, 138.3167], // 小淵沢駅
    [35.7973, 138.2983], // 尾白川渓谷
    [35.8615, 138.3167], // 小淵沢駅
    [36.0486, 138.1144], // 上諏訪駅
    [36.0483, 138.1133], // 諏訪湖
    [36.0583, 138.1033], // 立石公園
    [36.2308, 137.9642], // 松本駅
];

// ==========================================
// 5月1日 上高地徒步路线
// ==========================================
const ROUTE_DAY2 = [
    [36.2284, 137.6197], // 大正池
    [36.2357, 137.6244], // 田代池
    [36.2488, 137.6378], // 河童橋
    [36.2540, 137.6638], // 明神池
    [36.2600, 137.6900], // 徳沢
    [36.2600, 137.6900], // 徳沢（折返）
    [36.2540, 137.6638], // 明神池
    [36.2488, 137.6378], // 河童橋
    [36.2450, 137.6310], // 上高地バスターミナル
];

// 梓川流向多边形（蓝色半透明遮罩）
const AZUSA_RIVER_POLYGON = [
    [36.2284, 137.6197], // 大正池起点
    [36.2320, 137.6210],
    [36.2380, 137.6250],
    [36.2420, 137.6300],
    [36.2488, 137.6378], // 河童橋
    [36.2520, 137.6450],
    [36.2540, 137.6550],
    [36.2560, 137.6650],
    [36.2580, 137.6800],
    [36.2600, 137.6900], // 徳沢
    [36.2580, 137.6880],
    [36.2550, 137.6700],
    [36.2520, 137.6550],
    [36.2488, 137.6400],
    [36.2450, 137.6330],
    [36.2400, 137.6280],
    [36.2350, 137.6230],
    [36.2300, 137.6180],
    [36.2284, 137.6197], // 闭合
];

// ==========================================
// 自定义图标 - 战术风格
// ==========================================
function createTacticalIcon(color, label, isObjective) {
    const colors = {
        green: '#22c55e',
        amber: '#f59e0b',
        red: '#ef4444',
        blue: '#3b82f6',
        purple: '#a855f7',
        cyan: '#06b6d4'
    };
    const hexColor = colors[color] || '#22c55e';
    
    // 目标点使用更大的标记
    const size = isObjective ? 24 : 16;
    const glowSize = isObjective ? '0 0 16px' : '0 0 8px';
    
    return L.divIcon({
        className: 'tactical-marker',
        html: `<div style="
            width: ${size}px; height: ${size}px;
            background: ${hexColor};
            border: ${isObjective ? '3px' : '2px'} solid #000;
            border-radius: 50%;
            box-shadow: ${glowSize} ${hexColor}80;
            ${isObjective ? 'animation: tactical-pulse 2s infinite;' : ''}
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size/2, size/2],
        popupAnchor: [0, -size/2 - 5]
    });
}

// ==========================================
// 战术风格弹窗
// ==========================================
function createTacticalPopup(label, time, desc, isObjective) {
    const objectiveBadge = isObjective ? `
        <div style="
            margin-top: 6px; padding: 3px 8px;
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid #22c55e;
            border-radius: 3px;
            font-size: 11px;
            color: #22c55e;
            text-align: center;
        ">
            ✓ 抵达即完成目标
        </div>
    ` : '';
    
    return `
        <div style="
            background: #0f172a;
            color: #f59e0b;
            font-family: 'Share Tech Mono', monospace;
            padding: 10px 14px;
            border: 1px solid ${isObjective ? '#22c55e' : '#f59e0b'};
            border-radius: 4px;
            font-size: 13px;
            min-width: 160px;
        ">
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
                <div style="
                    width: 8px; height: 8px;
                    background: ${isObjective ? '#22c55e' : '#f59e0b'};
                    border-radius: 50%;
                    margin-right: 8px;
                    box-shadow: 0 0 6px ${isObjective ? '#22c55e' : '#f59e0b'}80;
                "></div>
                <strong style="color: ${isObjective ? '#22c55e' : '#f59e0b'}; font-size: 14px;">${label}</strong>
            </div>
            ${time ? `<div style="color: #9ca3af; margin-left: 16px; font-size: 12px;">⏱ ${time}</div>` : ''}
            ${desc ? `<div style="color: #d1d5db; margin-left: 16px; font-size: 12px; margin-top: 2px;">${desc}</div>` : ''}
            ${objectiveBadge}
        </div>
    `;
}

// ==========================================
// 初始化地图（通用）
// ==========================================
function initMap(containerId, center, zoom, markers, routes, overlays) {
    const map = L.map(containerId, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        attributionControl: false
    });
    
    // 暗色地图瓦片（CartoDB DarkMatter - 战术风格）
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
    }).addTo(map);
    
    // 添加覆盖层（如梓川蓝色遮罩）
    if (overlays) {
        overlays.forEach(o => {
            if (o.type === 'polygon' && o.coords.length > 0) {
                L.polygon(o.coords, {
                    color: o.color || '#06b6d4',
                    fillColor: o.fillColor || '#06b6d4',
                    fillOpacity: o.fillOpacity || 0.08,
                    weight: o.weight || 0,
                    opacity: 0
                }).addTo(map);
            }
        });
    }
    
    // 添加路线
    if (routes) {
        routes.forEach(r => {
            if (r.coords && r.coords.length > 0) {
                L.polyline(r.coords, {
                    color: r.color || '#22c55e',
                    weight: r.weight || 3,
                    opacity: r.opacity || 0.7,
                    dashArray: r.dashArray || null
                }).addTo(map);
            }
        });
    }
    
    // 添加标记
    markers.forEach(m => {
        const marker = L.marker(m.coords, {
            icon: createTacticalIcon(m.color, m.label, m.isObjective)
        }).addTo(map);
        
        marker.bindPopup(
            createTacticalPopup(m.label, m.time, m.desc, m.isObjective),
            {
                closeButton: false,
                className: 'tactical-popup',
                offset: [0, -5]
            }
        );
    });
    
    // 延迟刷新地图（解决隐藏标签页渲染问题）
    setTimeout(() => {
        map.invalidateSize();
    }, 500);
    
    return map;
}

// ==========================================
// 初始化4月30日地图 - 尾白川环线
// ==========================================
function initDay1Map() {
    const markers = [
        { coords: COORDS['小淵沢駅'], label: '小淵沢駅', time: '09:22', color: 'green', desc: '特急Azusa 3号抵达' },
        { coords: COORDS['尾白川渓谷 駐車場'], label: '尾白川渓谷 駐車場', time: '10:15', color: 'amber', desc: 'E-bike骑行9.5km' },
        { coords: COORDS['竹宇駒ヶ岳神社'], label: '竹宇駒ヶ岳神社', time: '10:30', color: 'green', desc: '徒步起点' },
        { coords: COORDS['千ヶ淵'], label: '千ヶ淵', time: '11:15', color: 'blue', desc: '溪谷中段' },
        { coords: COORDS['神蛇滝'], label: '★ 神蛇滝', time: '11:45', color: 'red', desc: '瀑布折返点', isObjective: true },
        { coords: COORDS['上諏訪駅'], label: '上諏訪駅', time: '13:35', color: 'red', desc: '鳗鱼饭午餐' },
        { coords: COORDS['諏訪湖'], label: '諏訪湖', time: '14:45', color: 'blue', desc: '足汤+散步' },
        { coords: COORDS['立石公園'], label: '立石公園', time: '18:30', color: 'purple', desc: '你的名字同款日落' },
        { coords: COORDS['松本駅'], label: '松本駅', time: '19:15', color: 'green', desc: '前往酒店' },
    ];
    
    const routes = [
        // 去程：荧光绿实线（沿溪谷）
        { coords: ROUTE_DAY1_GO, color: '#22c55e', weight: 4, opacity: 0.8 },
        // 回程：荧光绿虚线（尾根道/山脊撤退路线）
        { coords: ROUTE_DAY1_RETREAT, color: '#22c55e', weight: 3, opacity: 0.6, dashArray: '8, 8' },
        // 整体行程：琥珀色虚线
        { coords: ROUTE_DAY1_TRANSIT, color: '#f59e0b', weight: 2, opacity: 0.5, dashArray: '6, 6' },
    ];
    
    initMap('map-day1', [35.88, 138.22], 12, markers, routes);
}

// ==========================================
// 初始化5月1日地图 - 上高地徒步
// ==========================================
function initDay2Map() {
    const markers = [
        { coords: COORDS['大正池'], label: '大正池', time: '08:50', color: 'red', desc: '徒步起点' },
        { coords: COORDS['田代池'], label: '田代池', time: '09:30', color: 'blue', desc: '湿地区域' },
        { coords: COORDS['河童橋'], label: '★ 河童橋', time: '10:30', color: 'cyan', desc: '上高地象征', isObjective: true },
        { coords: COORDS['明神池'], label: '明神池', time: '11:30', color: 'blue', desc: '明神岳背景' },
        { coords: COORDS['徳沢'], label: '徳沢', time: '12:30', color: 'purple', desc: '午餐+冰淇淋' },
        { coords: COORDS['上高地バスターミナル'], label: '上高地BT', time: '15:30', color: 'green', desc: '回程巴士' },
    ];
    
    const routes = [
        // 徒步路线：亮蓝色实线
        { coords: ROUTE_DAY2, color: '#06b6d4', weight: 4, opacity: 0.8 },
    ];
    
    const overlays = [
        // 梓川流向：蓝色半透明遮罩
        { type: 'polygon', coords: AZUSA_RIVER_POLYGON, fillColor: '#06b6d4', fillOpacity: 0.08, color: '#06b6d4', weight: 0 },
    ];
    
    initMap('map-day2', [36.245, 137.645], 14, markers, routes, overlays);
}

// 监听标签页切换，初始化地图
function initMaps() {
    // 监听标签页切换事件
    const tabButtons = document.querySelectorAll('.tab-btn');
    let mapsInitialized = { day1: false, day2: false };
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            if (tabId === 'day1' && !mapsInitialized.day1) {
                setTimeout(() => {
                    initDay1Map();
                    mapsInitialized.day1 = true;
                }, 300);
            }
            
            if (tabId === 'day2' && !mapsInitialized.day2) {
                setTimeout(() => {
                    initDay2Map();
                    mapsInitialized.day2 = true;
                }, 300);
            }
        });
    });
    
    // 如果默认显示day1，也初始化
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab && activeTab.id === 'day1' && !mapsInitialized.day1) {
        setTimeout(() => {
            initDay1Map();
            mapsInitialized.day1 = true;
        }, 500);
    }
    if (activeTab && activeTab.id === 'day2' && !mapsInitialized.day2) {
        setTimeout(() => {
            initDay2Map();
            mapsInitialized.day2 = true;
        }, 500);
    }
}

// 在DOM加载完成后初始化地图
document.addEventListener('DOMContentLoaded', function() {
    // 原有的初始化
    initTabSwitching();
    initTimelineAnimation();
    initTacticalEffects();
    
    // 装备清单初始化
    initEquipmentChecklist();
    
    // 地图初始化
    initMaps();
    
    // 显示加载完成状态
    setTimeout(() => {
        updateStatus('任务系统已上线', 'green');
        console.log('GW旅行战术计划终端已启动 - 所有系统正常');
    }, 1000);
});
