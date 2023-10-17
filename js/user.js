
async function register() {
  const name = $("#name").val();
  const email = $("#email").val();
  const mobile = $("#mob").val();
  const companyName = $("#cname").val();
  const requirements = $("#message").val();

  // Regular expressions for email and mobile validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^\d{10}$/;

  let errorMessage = "";

//   if (
//     name.trim() === "" ||
//     email.trim() === "" ||
//     mobile.trim() === "" ||
//     companyName.trim() === ""
//   ) {
//     errorMessage +=
//       '<span style="color: red;">Enter Mandatory Details.</span><br>';
//   }else if (!emailRegex.test(email)) {
//     errorMessage += '<span style="color: red;">Enter valid Email.</span><br>';
//   } else if (!mobileRegex.test(mobile)) {
//     errorMessage +=
//       '<span style="color: red;">Enter valid Mobile Number.</span>';
//   }

//   if (errorMessage !== "") {
//     $("#dt").html(errorMessage);
//     return;
//   }
if (
    name.trim() === "" ||
    email.trim() === "" ||
    mobile.trim() === "" ||
    companyName.trim() === ""
  ) {
    errorMessage +=
      '<span style="color: red; font-family: "Pacifico", cursive; font-size: 1px ;">Enter Mandatory Details*</span><br>';
  } else if (!emailRegex.test(email)) {
    errorMessage += '<span style="color: red; font-family: "Pacifico", cursive; font-size: 1px ;">Enter valid Email.</span><br>';
  } else if (!mobileRegex.test(mobile)) {
    errorMessage +=
      '<span style="color: red; font-family: "Pacifico", cursive; font-size: 1px ;">Enter valid Mobile Number.</span>';
  }

  if (errorMessage !== "") {
    $("#dt").html(errorMessage);
    return;
  }



  const url = "http://localhost:8080/save"; 
  const data = {
    name: name,
    email: email,
    mobile: mobile,
    companyName: companyName,
    requirements: requirements,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const registrationStatus = await response.text();
      $("#dt").html(registrationStatus);
    } else {
      $("#dt").html("Error checking registration.");
    }
  } catch (error) {
    console.error(error);
    $("#dt").html("An error occurred.");
  }
}

//===================================================================================

async function getAllUsers() {
  const url = "http://localhost:8080/get-all";
  const result = await fetch(url, { method: "GET" });
  const finalResult = await result.json();

  // console.log(finalResult);
  // document.getElementById('result').textContent = JSON.stringify(finalResult);

  console.log(finalResult);

  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = ""; // Clear previous content
  let data = "";
  finalResult.forEach((user) => {
    data =
      data +
      "<tr>" +
      "<td>" +
      user.name +
      "</td>" +
      "<td>" +
      user.email +
      "</td>" +
      "<td>" +
      user.mobile +
      "</td>" +
      "<td>" +
      user.companyName +
      "</td>" +
      "<td>" +
      user.requirements +
      "</td>" +
      "</tr>";
    //    resultContainer.innerHTML += `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Mobile: ${user.mobile}<br>`;
  });

  $("#td-id").html(data);
}

$("#result").click(function () {
  getAllUsers();
});
