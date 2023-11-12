const style = {
  //*********** Common ***********
  heading: {
    marginBottom: 5,
  },

  //************ index ************

  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    height: 40,
    textTransform: "none",
    backgroundColor: "#8e85f3",
  },
  block: {
    padding: 2,
    borderRadius: 3,
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrap: {
    display: "flex",
    alignItems: "center",
  },
  btn: {
    width: "50%",
  },

  //************ Add Lottery *************

  flex: {
    display: "flex",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    "& label": {
      fontSize: 13,
      marginTop: "2px",
    },
  },
  addBtn: {
    marginTop: 6,
    width: "20%",
    textTransform: "none",
    alignSelf: "flex-start",
  },
};

export default style;