/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import { isValid } from "date-fns";
import Autocomplete from "@mui/material/Autocomplete";
const countryOptions = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor-Leste)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

// Définir la liste des langues
const languageOptions = [
  "English",
  "French",
  "Spanish",
  "German",
  "Chinese (Mandarin)",
  "Hindi",
  "Arabic",
  "Bengali",
  "Portuguese",
  "Russian",
  "Japanese",
  "Punjabi",
  "Turkish",
  "Korean",
  "Italian",
  "Vietnamese",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Polish",
  "Persian",
  "Malayalam",
  "Telugu",
  "Thai",
  "Javanese",
  "Kannada",
  "Burmese",
  "Odia",
  "Sunda",
  "Sindhi",
  "Romanian",
  "Dutch",
  "Greek",
  "Swedish",
  "Czech",
  "Danish",
  "Finnish",
  "Hungarian",
  "Norwegian",
  "Slovak",
  "Bulgarian",
  "Catalan",
  "Hebrew",
  "Indonesian",
  "Malay",
  "Swahili",
  "Ukrainian",
  "Lithuanian",
  "Filipino",
  "Slovenian",
  "Latvian",
  "Estonian",
  "Icelandic",
  "Vietnamese",
  "Yoruba",
  "Zulu",
  "Marathi",
  "Swedish",
  "Tagalog",
  "Hausa",
  "Serbian",
  "Albanian",
  "Azerbaijani",
  "Igbo",
  "Amharic",
  "Farsi",
  "Pashto",
  "Tajik",
  "Somali",
  "Kurdish",
  "Tigrinya",
  "Malagasy",
  "Hmong",
  "Uzbek",
  "Kinyarwanda",
  "Sinhala",
  "Bhojpuri",
  "Turkmen",
  "Cebuano",
];
const skillsOptions = [
  // Programming Languages and Technologies
  "JavaScript",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "Python",
  "Java",
  "C++",
  "C#",
  "SQL",
  "Angular",
  "Vue.js",
  "TypeScript",
  "PHP",
  "ASP.NET",
  "Ruby",
  "Swift",
  "Objective-C",
  "Kotlin",
  "Django",
  "Flask",
  "Spring",
  "Hibernate",
  "jQuery",
  "Bootstrap",
  "Sass",
  "Less",
  "TensorFlow",
  "PyTorch",
  "Keras",
  // Artisan Skills
  "Woodworking",
  "Metalworking",
  "Pottery",
  "Glassblowing",
  "Sculpting",
  "Painting",
  "Drawing",
  "Calligraphy",
  "Jewelry Making",
  "Knitting",
  "Crocheting",
  // Computer Science Skills
  "Data Structures",
  "Algorithms",
  "Software Engineering",
  "Networking",
  "Cybersecurity",
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Big Data",
  "Data Science",
  "Data Analysis",
  "Data Visualization",
  "Blockchain",
  "Cloud Computing",
  "DevOps",
  "Web Development",
  "Mobile App Development",
  // Healthcare Skills
  "Medical Terminology",
  "Patient Care",
  "Medical Coding",
  "Nursing",
  "Pharmacy",
  "Medical Imaging",
  "Health Informatics",
  "Physical Therapy",
  "Occupational Therapy",
  "Speech Therapy",
  "Emergency Medicine",
  "Anesthesiology",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  // Add more skills as needed
];

function Overview() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [SelectedCountries, setSelectedCountries] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  const handleSkillsChange = (event, newSkills) => {
    setSelectedSkills(newSkills);
    setFormData({
      ...formData,
      skills: newSkills.join(", "),
    });
  };

  const handleOpenDialog = (section) => {
    setEditingSection(section);
    setOpenDialog(true);
    // Pre-fill the dialog fields with existing data
    setFormData({
      ...formData,
      [section]: userInfo[section],
    });
  };

 

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/user/updateUser/${userId}`, formData);
      console.log(response.data);
      setOpenDialog(false);
      setUserInfo(formData);
      setOpenContactDialog(false);
      setOpenProfileDialog(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleLanguagesChange = (event, newLanguages) => {
    setSelectedLanguages(newLanguages);
    setFormData({
      ...formData,
      languages: newLanguages.join(", "),
    });
  };

  const handleCountriesChange = (event, newCountries) => {
    setSelectedCountries(newCountries);
    setFormData({
      ...formData,
      country: newCountries.join(", "),
    });
  };


  const [userInfo, setUserInfo] = useState({});

  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const userId = sessionStorage.getItem("userId");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dateOfBirth: "",
    country: "",
    phone: "",
    languages: "",
    description: "",
    experience: "",
    formation: "",
    skills: "",
    certificates: "",
    emailError: "",

    phoneError: "",

  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (name === "email") {
      if (!/\S+@\S+\.\S{2,}/.test(value)) {
        errorMessage = "Invalid email format";
      }
    } else if (name === "phone") {
      if (!/^\d{8}$/.test(value)) {
        errorMessage = "Phone must be 8 numbers";
      }
    }
    setFormData({
      ...formData,
      [name]: value,
      [`${name}Error`]: errorMessage,
    });
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/get/${userId}`);
        setUserInfo(response.data);
        // Pre-fill form data with user details
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);


  const handleOpenContactDialog = () => {
    setOpenContactDialog(true);
    setEditingSection("contact");
    // Pré-remplir les champs de la boîte de dialogue avec les données de contact
    setFormData({
      ...formData,
      phone: userInfo.phone,
      email: userInfo.email
    });
  };

  const handleOpenProfileDialog = () => {
    setOpenProfileDialog(true);
    setEditingSection("profile");
    // Pré-remplir les champs de la boîte de dialogue avec les données de profil
    setFormData({
      ...formData,
      dateOfBirth: userInfo.dateOfBirth,
      country: userInfo.country,
      languages: userInfo.languages
    });
  };

  const handleCloseDialog = () => {
    setOpenContactDialog(false);
    setOpenProfileDialog(false);
    setEditingSection(null);
    setOpenDialog(false);

  };




  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        {userInfo && (
          <>
            <div style={containerStyle}>
              <div style={columnStyle}>
              <div style={sectionStyle}>
                  <h3 style={headingStyle}>
                    Contact
                    <EditIcon style={editIconStyle} color="primary" onClick={handleOpenContactDialog} />
                  </h3>
                  <div style={contactContainer}>
                    <p><strong>Phone:</strong> <span style={textStyle}>{userInfo.phone}</span></p>
                  </div>
                  <div style={contactContainer}>
                    <p><strong>Email:</strong> <span style={textStyle}>{userInfo.email}</span></p>
                  </div>
                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Profile Information
                  <EditIcon style={editIconStyle} color="primary" onClick={handleOpenProfileDialog} />
                  </h3>
                  <div style={contactContainer}>
                    <p><strong>Date of Birth:</strong> <span style={textStyle}>{userInfo.dateOfBirth}</span></p>
                  </div>
                  <div style={contactContainer}>
                    <p><strong>Country:</strong> <span style={textStyle}>{userInfo.country}</span></p>
                  </div>
                  <div style={contactContainer}>
                    <p><strong>Languages:</strong> <span style={textStyle}>{userInfo.languages}</span></p>
                  </div>
                </div>
              </div>

              <div style={columnStyle}>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>About Me
                    <EditIcon color="primary" onClick={() => handleOpenDialog("description")} />
                  </h3>
                  <div style={contactContainer}>
                    <p style={textStyle}>{userInfo.description}</p>
                  </div>
                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Experience
                    <EditIcon color="primary" onClick={() => handleOpenDialog("experience")} />
                  </h3>
                  <div style={contactContainer}>

                    <p style={textStyle}>{userInfo.experience}</p>

                  </div>
                </div>

                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Education
                    <EditIcon color="primary" onClick={() => handleOpenDialog("formation")} />
                  </h3>
                  <div style={contactContainer}>
                    <p style={textStyle}>{userInfo.formation}</p>
                  </div>

                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Skills
                    <EditIcon color="primary" onClick={() => handleOpenDialog("skills")} />
                  </h3>
                  <div style={contactContainer}>
                    <p style={textStyle}>{userInfo.skills}</p>

                  </div>
                </div>

                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Certificates
                    <EditIcon color="primary" onClick={() => handleOpenDialog("certificates")} />
                  </h3>
                  <div style={contactContainer}>

                    <p style={textStyle}>{userInfo.certificates}</p>
                  </div>

                </div>
              </div>
            </div>
            {/* Dialogue pour modifier les informations de contact */}
            {/* Dialog for editing sections */}
<Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>Edit {editingSection}</DialogTitle>
  <DialogContent>
    {editingSection === "skills" && (
      <Autocomplete
        multiple
        options={skillsOptions}
        value={selectedSkills}
        onChange={handleSkillsChange}
        renderInput={(params) => <TextField {...params} label="Skills" />}
      />
    )}
    {editingSection !== "skills" && (
      <TextField
        name={editingSection}
        label={editingSection}
        value={formData[editingSection]}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog}>Cancel</Button>
    <Button onClick={handleUpdateUser} color="primary">Save</Button>
  </DialogActions>
</Dialog>

 {/* Dialogue pour modifier les informations de contact */}
 <Dialog open={openContactDialog} onClose={handleCloseDialog}>
              <DialogTitle>Modify Contact Information</DialogTitle>
              <DialogContent>
                <TextField
                  name="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                {formData.phoneError && (
                  <p style={{ color: "red" }}>{formData.phoneError}</p>
                )}
                <TextField
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />{formData.emailError && (
                  <p style={{ color: "red" }}>{formData.emailError}</p>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleUpdateUser} color="primary" disabled={!isValid}>Save</Button>
              </DialogActions>
            </Dialog>

            {/* Dialogue pour modifier les informations de profil */}
            <Dialog open={openProfileDialog} onClose={handleCloseDialog}>
              <DialogTitle>Modify Profile Information</DialogTitle>
              <DialogContent>
                <TextField
                  name="dateOfBirth"
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
        <Autocomplete
  multiple
  options={countryOptions}
  value={SelectedCountries}
  onChange={handleCountriesChange}
  renderInput={(params) => <TextField {...params} label="Countries" />}
/>
              <Autocomplete
          multiple
          options={languageOptions}
          value={selectedLanguages}
          onChange={handleLanguagesChange}
          renderInput={(params) => <TextField {...params} label="Languages" />}
        />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleUpdateUser} color="primary">Save</Button>
              </DialogActions>
            </Dialog>



          </>
        )}
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "flex-start",
};

const columnStyle = {
  flex: "1",
  minWidth: "50%",
};

const sectionStyle = {
  marginBottom: "20px",
  padding: "20px",
  background: "#f9f9f9",
  borderRadius: "5px",
  margin: "10px"
};

const headingStyle = {
  marginBottom: "10px",
  color: "#333",
};

const textStyle = {
  color: "#555",
  fontSize: "16px"
};
const editIconStyle = {
  marginRight: "10px"
};
const contactContainer = {
  display: "flex",
  alignItems: "center"
};

export default Overview;
