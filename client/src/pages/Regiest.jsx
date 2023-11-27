import { useEffect } from "react";
import { Link } from "react-router-dom";

const Regiest = () => {
  useEffect(() => {
    // label 이펙트
    let label = document.querySelectorAll("label");
    label.forEach((label) => {
      label.innerHTML = label.innerText
        .split("")
        .map(
          (letters, i) =>
            `<span style=transition-delay:${i * 50}ms>${letters}</span>`
        )
        .join("");
    });
  });

  return (
    <>
      <div className="regiestContainer">
        <div className="regiBox">
          <div>
            <h2>Hazelnut</h2>
          </div>

          <form action="">
            <div className="regiInputBox">
              <input type="text" required />
              <label htmlFor="">사용자 이름</label>
              <button>중복확인</button>
            </div>
            <div className="regiInputBox">
              <input type="text" required />
              <label htmlFor="">이메일</label>
              <button>중복확인</button>
            </div>
            <div className="regiInputBox">
              <input type="password" required />
              <label htmlFor="">비빌번호</label>
            </div>
            <div className="regiInputBox">
              <input type="password" required />
              <label htmlFor="">비밀번호 확인</label>
            </div>
            <div className="regiInputBox">
              <input type="submit" value="생성" />
            </div>
            <p className="df-jcc-aic">
              이미 계정이 있으신가요? <Link to="/">로그인</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Regiest;
