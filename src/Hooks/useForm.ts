const url =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeW7WVX4bqjKbz7_fHOmu83lw6-YN4scX69ekS-iJ7UwAHIiw/formResponse";

const titleID = "entry.1391241763";
const acceID = "entry.304437600";
const orientID = "entry.876610990";

export const useFormText = () => {
  const postForm = async (
    title: string,
    acceText: string,
    orientText: string
  ) => {
    try {
      const form1 = encodeURIComponent(title);
      const form2 = encodeURIComponent(acceText);
      const form3 = encodeURIComponent(orientText);
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `${titleID}=${form1}&${acceID}=${form2}&${orientID}=${form3}`
      });
      window.alert("success");
    } catch (e) {
      window.alert("error");
    }
  };
  return { postForm };
};
