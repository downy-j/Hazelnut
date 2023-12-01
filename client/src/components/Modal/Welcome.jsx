const Welcome = (props) => {
  const Update = (e) => {
    props.setUpdate(e.target.value);
  };

  return (
    <>
      <div className="welcomeContainer df-jcc-aic">
        <div className="welcomeBox">
          <div
            className="close df-jcc-aic"
            onClick={() => {
              props.setWelcomeModal(props.isAlramModal);
            }}
          >
            <i class="fa-solid fa-xmark"></i>
          </div>

          <div className="welcomeForm">
            <input type="text" required onChange={(e) => Update(e)} />
            <span>대화명 변경</span>
            <input
              type="submit"
              value="변경"
              onClick={() => {
                props.setWelcome(props.isUpdate);
                props.setWelcomeModal(props.isAlramModal);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
