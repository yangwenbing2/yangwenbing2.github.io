// 打字机效果配置
const commands = [
    'whoami',
    'cat profile.txt',
    'ls -la /portfolio/',
    'vim resume.md',
    'git status',
    'python ai_model.py',
    'docker run --rm portfolio'
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// 打字机效果
function typeCommand() {
    const typingText = document.getElementById('typingText');
    const currentCommand = commands[commandIndex];

    if (!isDeleting) {
        // 正在输入
        typingText.textContent = currentCommand.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentCommand.length) {
            // 输入完成，暂停后开始删除
            isDeleting = true;
            typingSpeed = 50;
            setTimeout(typeCommand, 2000);
            return;
        }
    } else {
        // 正在删除
        typingText.textContent = currentCommand.substring(0, charIndex);
        charIndex--;

        if (charIndex === 0) {
            // 删除完成，切换到下一个命令
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            typingSpeed = 100;
            setTimeout(typeCommand, 500);
            return;
        }
    }

    setTimeout(typeCommand, isDeleting ? 50 : typingSpeed);
}

// 页面加载动画
function initAnimations() {
    // 启动打字机效果
    setTimeout(typeCommand, 1000);

    // 观察器配置
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有section
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 终端控制按钮交互
function initTerminalControls() {
    const closeBtn = document.querySelector('.control.close');
    const minimizeBtn = document.querySelector('.control.minimize');
    const maximizeBtn = document.querySelector('.control.maximize');

    closeBtn.addEventListener('click', () => {
        if (confirm('确定要关闭终端吗？')) {
            document.body.style.opacity = '0';
            setTimeout(() => {
                alert('感谢访问！再次打开页面即可返回。');
                location.reload();
            }, 500);
        }
    });

    minimizeBtn.addEventListener('click', () => {
        const content = document.querySelector('.content');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            minimizeBtn.style.background = '#ffbd2e';
        } else {
            content.style.display = 'none';
            minimizeBtn.style.background = '#555';
        }
    });

    let isMaximized = false;
    maximizeBtn.addEventListener('click', () => {
        const container = document.querySelector('.container');
        if (!isMaximized) {
            container.style.maxWidth = '100%';
            container.style.margin = '0';
            container.style.borderRadius = '0';
            container.style.height = '100vh';
            isMaximized = true;
        } else {
            container.style.maxWidth = '1200px';
            container.style.margin = '20px auto';
            container.style.borderRadius = '8px';
            container.style.height = 'auto';
            isMaximized = false;
        }
    });
}

// 添加代码高亮效果
function addCodeHighlight() {
    const codeElements = document.querySelectorAll('code, pre');
    codeElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'var(--hover-bg)';
        });
        element.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
}

// 技能条动画
function animateSkillBars() {
    const skills = document.querySelectorAll('.skill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    skills.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateX(-20px)';
        skill.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(skill);
    });
}

// 添加键盘快捷键
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: 清屏效果
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const content = document.querySelector('.content');
            content.style.opacity = '0';
            setTimeout(() => {
                content.style.opacity = '1';
            }, 300);
        }

        // Ctrl/Cmd + L: 滚动到顶部
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// 添加矩阵雨彩蛋（按下 Ctrl+Shift+M）
function initMatrixRain() {
    let matrixActive = false;
    
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'M') {
            e.preventDefault();
            
            if (!matrixActive) {
                createMatrixRain();
                matrixActive = true;
            } else {
                removeMatrixRain();
                matrixActive = false;
            }
        }
    });
}

function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '999';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    window.matrixInterval = setInterval(draw, 33);
}

function removeMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.remove();
    }
    if (window.matrixInterval) {
        clearInterval(window.matrixInterval);
    }
}

// 添加命令行提示
function showCommandHints() {
    console.log('%c欢迎来到我的终端简历！', 'color: #00ff41; font-size: 16px; font-weight: bold;');
    console.log('%c快捷键提示:', 'color: #00cc33; font-size: 14px;');
    console.log('%c  Ctrl/Cmd + K: 刷新页面', 'color: #8b949e;');
    console.log('%c  Ctrl/Cmd + L: 返回顶部', 'color: #8b949e;');
    console.log('%c  Ctrl + Shift + M: 矩阵雨彩蛋', 'color: #8b949e;');
    console.log('%c\n在控制台输入 help() 查看更多命令', 'color: #00ff41;');
}

// 控制台命令系统
window.help = function() {
    console.log('%c可用命令:', 'color: #00ff41; font-size: 14px;');
    console.log('  about() - 关于我');
    console.log('  skills() - 技能列表');
    console.log('  contact() - 联系方式');
    console.log('  projects() - 项目经历');
    console.log('  clear() - 清空控制台');
};

window.about = function() {
    console.log('姓名: 阳文兵');
    console.log('年龄: 27');
    console.log('专业: 计算机技术硕士');
    console.log('专注: 计算机视觉 & 大模型应用');
};

window.skills = function() {
    console.log('Python [精通] ████████░░');
    console.log('PyTorch [精通] ██████████');
    console.log('Computer Vision ██████████');
    console.log('Deep Learning ██████████');
};

window.contact = function() {
    console.log('Email: yangwenbing2@163.com');
    console.log('Phone: 15072654854');
    console.log('QQ: 670961229');
};

window.projects = function() {
    console.log('1. ChatIG - AI智能助手');
    console.log('2. 天瞳威视 - 视觉感知项目');
    console.log('3. 低质视频分类系统');
};

// 初始化复制功能
function initCopyFunctionality() {
    // 为电话号码添加复制功能
    const phoneNumber = document.querySelector('a[href^="tel:"]');
    if (phoneNumber) {
        phoneNumber.classList.add('copyable');
        phoneNumber.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = phoneNumber.textContent.trim();
            navigator.clipboard.writeText(phone).then(() => {
                // 可以添加一个提示，比如改变颜色或显示提示消息
                phoneNumber.style.color = '#00ff41';
                setTimeout(() => {
                    phoneNumber.style.color = '';
                }, 1000);
            });
        });
    }
    
    // 为可复制元素添加复制功能
    const copyableElements = document.querySelectorAll('.copyable');
    copyableElements.forEach(element => {
        element.addEventListener('click', () => {
            const content = element.dataset.content || element.textContent.trim();
            navigator.clipboard.writeText(content).then(() => {
                // 视觉反馈
                element.style.color = '#00ff41';
                setTimeout(() => {
                    element.style.color = '';
                }, 1000);
            });
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initTerminalControls();
    addCodeHighlight();
    animateSkillBars();
    initKeyboardShortcuts();
    initMatrixRain();
    showCommandHints();
    initCopyFunctionality();
    
    // 添加加载完成日志
    console.log('%c[系统] 终端初始化完成 ✓', 'color: #00ff41;');
    console.log('%c[系统] 输入 help() 查看可用命令', 'color: #00cc33;');
});

// 窗口大小改变时重新调整
window.addEventListener('resize', () => {
    const matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
        removeMatrixRain();
        createMatrixRain();
    }
});