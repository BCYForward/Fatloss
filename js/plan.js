// js/plan.js
document.addEventListener('DOMContentLoaded', function () {
    // 从 URL 参数读取数据（推荐方式）
    const params = new URLSearchParams(window.location.search);

    const height = params.get('height');
    const weight = params.get('weight');
    const bmi = params.get('bmi');
    const goalWeight = params.get('goalWeight');
    const currentType = params.get('currentType');
    const goalType = params.get('goalType');

    if (height && weight && bmi) {
        document.getElementById('planHeight').textContent = height;
        document.getElementById('planWeight').textContent = weight;
        document.getElementById('planBMI').textContent = bmi;
        document.getElementById('cardBMI').textContent = bmi;
        document.getElementById('planGoalWeight').textContent = goalWeight;
        document.getElementById('planCurrentType').textContent = currentType;
        document.getElementById('planGoalType').textContent = goalType;

        // 计算差值与时间
        const diff = Math.abs(weight - goalWeight).toFixed(1);
        const weeks = Math.ceil(diff / 0.5); // 每周减0.5kg
        document.getElementById('weightDiff').textContent = diff;
        document.getElementById('estWeeks').textContent = weeks;

        // BMI 状态
        const bmiNum = parseFloat(bmi);
        let status = '';
        if (bmiNum < 18.5) status = 'Underweight';
        else if (bmiNum < 25) status = 'Normal';
        else if (bmiNum < 30) status = 'Overweight';
        else status = 'Obese';
        document.getElementById('bmiStatus').textContent = status;
    }
});