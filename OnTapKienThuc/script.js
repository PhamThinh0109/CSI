// Đây là một tệp JavaScript. Các chú thích được viết như thế này.
// Mã trong tệp này sẽ chạy sau khi trang HTML đã được tải xong.

// Đợi cho toàn bộ nội dung HTML được tải xong rồi mới chạy mã
document.addEventListener('DOMContentLoaded', function() {

    // --- PHẦN 1: TƯƠNG TÁC CHO DEMO CHU KỲ MÁY ---

    // Lấy các phần tử HTML cần dùng bằng ID của chúng
    const cycleBtn = document.getElementById('cycle-btn');
    const fetchStep = document.getElementById('fetch');
    const decodeStep = document.getElementById('decode');
    const executeStep = document.getElementById('execute');

    const steps = [fetchStep, decodeStep, executeStep];
    let currentStep = -1; // Bắt đầu từ -1 để lần nhấn đầu tiên sẽ là bước 0

    // Thêm một sự kiện 'click' cho nút bấm
    cycleBtn.addEventListener('click', function() {
        // Xóa class 'active' khỏi bước hiện tại (nếu có)
        if (currentStep >= 0) {
            steps[currentStep].classList.remove('active');
        }

        // Chuyển sang bước tiếp theo
        currentStep = (currentStep + 1) % steps.length; // Dùng phép chia lấy dư để quay vòng (0, 1, 2, 0, 1, 2...)

        // Thêm class 'active' để làm nổi bật bước mới
        steps[currentStep].classList.add('active');
    });


    // --- PHẦN 2: TƯƠNG TÁC CHO BÀI TẬP TRẮC NGHIỆM ---

    // Dữ liệu câu hỏi
    const quizData = [{
            question: "Kiến trúc máy tính hiện đại chủ yếu dựa trên mô hình nào?",
            answers: ["Turing", "von Neumann", "Pascal", "Babbage"],
            correctAnswer: 1 // Index của câu trả lời đúng (von Neumann)
        },
        {
            question: "Thành phần nào trong CPU giữ địa chỉ của lệnh KẾ TIẾP sẽ được thực thi?",
            answers: ["ALU", "Instruction Register (IR)", "Program Counter (PC)", "Cache"],
            correctAnswer: 2
        },
        {
            question: "Việc lưu cả chương trình và dữ liệu trong cùng bộ nhớ được gọi là gì?",
            answers: ["Pipelining", "Stored-Program Concept", "Parallel Processing", "Machine Cycle"],
            correctAnswer: 1
        }
    ];

    let currentQuestionIndex = 0;

    // Lấy các phần tử HTML của phần quiz
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const resultText = document.getElementById('result-text');

    // Hàm để tải câu hỏi lên giao diện
    function loadQuestion() {
        resultText.textContent = ''; // Xóa kết quả của câu trước
        const currentQuestion = quizData[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        answerButtons.innerHTML = ''; // Xóa các nút trả lời cũ

        // Tạo các nút trả lời mới cho câu hỏi hiện tại
        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => checkAnswer(index));
            answerButtons.appendChild(button);
        });
    }

    // Hàm để kiểm tra câu trả lời
    function checkAnswer(selectedIndex) {
        const currentQuestion = quizData[currentQuestionIndex];
        if (selectedIndex === currentQuestion.correctAnswer) {
            resultText.textContent = "Chính xác! Giỏi lắm!";
            resultText.style.color = 'green';
        } else {
            resultText.textContent = "Sai rồi. Thử lại nhé!";
            resultText.style.color = 'red';
        }

        // Tự động chuyển sang câu hỏi tiếp theo sau 2 giây
        setTimeout(() => {
            currentQuestionIndex = (currentQuestionIndex + 1) % quizData.length;
            loadQuestion();
        }, 2000);
    }

    // Tải câu hỏi đầu tiên khi trang được mở
    loadQuestion();

});