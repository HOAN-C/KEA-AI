import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 260px;
  height: 310px;
  border: solid 1px grey;
  border-radius: 8px;
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const Img = styled.img`
  width: 150px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  //   margin-bottom: 20px;
`;

const InputForm = styled.div`
  width: 100%;
`;

const Input = styled.input`
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;

  margin-right: 3px;
`;

const Button = styled.button<{ userGender: boolean }>`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => (props.userGender ? "#007bff" : "#dc3545")};
  color: white;
  cursor: pointer;
  margin-left: 3px;
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  margin-left: 3px;
  &:hover {
    background-color: #218838;
  }
`;

const ResultContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const InputContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

function FinancialLuck() {
  const [userDate, setUserDate] = useState("");
  const [userGender, setUserGender] = useState(true);
  const [resultData, setResultData] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const userDateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value)) && value.length <= 8) {
      setUserDate(value);
    }
  };

  const userGenderHandler = () => {
    setUserGender(!userGender);
    console.log(userGender);
  };

  const showResultHandler = () => {
    // 사용자의 날짜 데이터 초기화
    setUserDate("");
    // 결과를 숨김
    setShowResult(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("여기에 API URL을 입력하세요", {
        params: {
          date: userDate,
          gender: userGender ? "male" : "female",
        },
      });
      setResultData(response.data);
      setShowResult(true);
    } catch (error) {
      console.error("서버로부터 데이터를 가져오는 데 실패했습니다", error);
    }
  };

  return (
    <Container>
      <Img src="/Image/Icons/coin.png" alt="FinancialLuck Img" />

      {showResult ? (
        <ResultContainer>
          {/* <p>{resultData.message}</p> */}
          <Title>{"국밥 먹으러 가자 ㄱㄱㄱㄱ"}</Title>
          <SubmitButton onClick={showResultHandler}>{"아싸!🎊"}</SubmitButton>
        </ResultContainer>
      ) : (
        <InputContainer>
          <Title>오늘의 금전운을 확인해보쇼!</Title>
          <InputForm>
            <Input
              placeholder="주민번호 앞 8자리"
              value={userDate}
              onChange={userDateHandler}
            ></Input>
            <Button
              userGender={userGender}
              onClick={userGenderHandler}
              // 타입스크립트에서는 속성을 직접 지정해줘야 합니다.
              // styled-components에서는 attrs를 사용하지 않습니다.
            >
              {userGender ? "남자" : "여자"}
            </Button>
          </InputForm>
          <SubmitButton onClick={fetchData}>확인하기</SubmitButton>
        </InputContainer>
      )}
    </Container>
  );
}

export default FinancialLuck;
