// js/Measurements.js
document.addEventListener('DOMContentLoaded', function () {
    // DOM 元素
    const heightInput   = document.getElementById('height');
    const weightInput   = document.getElementById('weight');
    const bmiInput      = document.getElementById('bmi');
    const bmiGoalSpan   = document.getElementById('bmiGoal');

    // 体型单选框
    const underweightRadio = document.getElementById('underweight');
    const normalRadio      = document.getElementById('normal');
    const overweightRadio  = document.getElementById('overweight');
    const obeseRadio       = document.getElementById('obese');

    // 表单元素
    const form = document.getElementById('bodyMeasurementsForm'); // 必须定义！

    // BMI 计算函数
    function calculateBMI() {
        const h = parseFloat(heightInput.value);
        const w = parseFloat(weightInput.value);

        if (h > 0 && w > 0) {
            const heightM = h / 100;
            const bmi = (w / (heightM * heightM)).toFixed(1);
            bmiInput.value = bmi;

            // 设置目标 BMI
            bmiGoalSpan.textContent = bmi < 18.5 || bmi > 24.9 ? '18.5 - 24.9' : 'Maintain current';

            // 自动选中 Current Body Type
            underweightRadio.checked = normalRadio.checked = overweightRadio.checked = obeseRadio.checked = false;

            if (bmi < 18.5) underweightRadio.checked = true;
            else if (bmi < 25) normalRadio.checked = true;
            else if (bmi < 30) overweightRadio.checked = true;
            else obeseRadio.checked = true;

        } else {
            bmiInput.value = '';
            bmiGoalSpan.textContent = '--';
            underweightRadio.checked = normalRadio.checked = overweightRadio.checked = obeseRadio.checked = false;
        }
    }

    // 实时监听
    heightInput.addEventListener('input', calculateBMI);
    weightInput.addEventListener('input', calculateBMI);

    // 表单提交 + 跳转（替换原来的 alert）
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const height = heightInput.value;
        const weight = weightInput.value;
        const bmi = bmiInput.value;
        const goalWeight = document.getElementById('weightGoal').value;
        const currentType = document.querySelector('input[name="currentBodyType"]:checked')?.value || 'Unknown';
        const goalType = document.getElementById('goalBodyType').value;

        // 必填验证
        if (!height || !weight || !goalWeight || currentType === 'Unknown' || !goalType) {
            alert('Please fill in all fields and ensure BMI is calculated.');
            return;
        }

        // 跳转到 plan.html 并传递参数
        const url = `plan.html?height=${height}&weight=${weight}&bmi=${bmi}&goalWeight=${goalWeight}&currentType=${encodeURIComponent(currentType)}&goalType=${encodeURIComponent(goalType)}`;
        window.location.href = url;
    });
});