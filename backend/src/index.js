const express = require('express');
const path = require('path');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('연결 완료');
})
.catch(err => {
    console.error(err);
})


// express.static()에 uploads 폴더의 절대 경로를 설정
//app.use('/haha', express.static(uploadsPath));
app.use(express.static(path.join(__dirname, '../src/uploads')));

app.get('/', (req, res) => {
    res.send('안녕하세요');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.listen(port, () => {
    console.log(`${port}번에서 실행이 되었습니다.`);
});
