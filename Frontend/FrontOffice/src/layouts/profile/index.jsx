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
const initialExperienceOptions = [
  "test5",
  "tt",
  "uu "];
const initialCertifOptions = [
  "ttyu",
  "tt",
  "uu "];


const initialEducationOptions = [
  "École Nationale d'Ingénieurs de Sousse",
  "École Nationale d'Ingénieurs de Bizerte",
  "École Nationale d'Ingénieurs de Monastir",
  "École Nationale d'Ingénieurs de Gabès",
  "Institut Supérieur de Biotechnologie de Monastir",
  "Institut Supérieur d'Informatique de Monastir",
  "Institut Supérieur des Arts Multimédia de la Manouba",
  "Institut Supérieur de Musique de Tunis",
  "Institut Supérieur d'Histoire du Mouvement National",
  "Institut Supérieur des Langues Appliquées et Informatique de Béja",
  "Institut Supérieur de Commerce et d'Administration des Entreprises de Nabeul",
  "Institut Supérieur de Gestion de Sousse",
  "Institut Supérieur de Gestion de Tunis",
  "Institut Supérieur de Gestion de Sfax",
  "Institut Supérieur de l'Éducation et de la Formation Continue de la Manouba",
  "Institut Supérieur des Sciences et Techniques du Sport de Tunis",
  "Institut Supérieur des Sciences Humaines de Tunis",
  "Institut Supérieur des Sciences et Technologies de l'Information et de la Communication de Tunis",
  "Institut Supérieur des Sciences Appliquées et de Technologie de Sousse",
  "Institut Supérieur des Sciences et des Technologies de l'Environnement de l'Ariana",
  "Institut Supérieur des Sciences et Technologies de l'Eau de Gabès",
  "Institut Supérieur des Sciences et Technologies de l'Environnement de Borj Cédria",
  "Institut Supérieur des Études Historiques de Tunis",
  "Institut Supérieur des Études Technologiques de Radès",
  "Institut Supérieur des Études Appliquées en Humanités de Zaghouan",
  "Institut Supérieur des Langues de Tunis"
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
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [selectedCertif, setSelectedCertif] = useState([]);

  const [EducationOptions, setEducationOptions] = useState([...initialEducationOptions]);
  const [experienceOptions, setExperienceOptions] = useState([...initialExperienceOptions]);
  const [CertifOptions, setCertifOptions] = useState([...initialCertifOptions]);

  const [openEducationDialog, setOpenEducationDialog] = useState(false); // New state for education dialog
  const [openCertifDialog, setOpenCertifDialog] = useState(false); // New state for education dialog

  const [openDialog, setOpenDialog] = useState(false);

  const [editingSection, setEditingSection] = useState(null);
  const [openExperienceDialog, setOpenExperienceDialog] = useState(false);

  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(null); // State for Date of Birth
  const [imageData, setImageData] = useState(null);

  // Function to handle changes in Date of Birth
  const handleDateOfBirthChange = (date) => {
    setSelectedDateOfBirth(date);
    setFormData({
      ...formData,
      dateOfBirth: date, // Update the formData state with the selected date
    });
  };

  // // Créez une fonction pour ouvrir le dialogue de l'expérience
  // const handleOpenExperienceDialog = () => {
  //   setOpenExperienceDialog(true);
  // };

  // Créez un nouvel état pour stocker les options de l'expérience
  const [selectedExperience, setSelectedExperience] = useState([]);
  const handleAddEducation = () => {
    // Open a dialog or prompt for users to enter the new education option
    const newEducationOption = prompt("Enter the new education option:");
    if (newEducationOption) {
      // Add the new education option to the existing options
      const updatedEducationOptions = [...EducationOptions, newEducationOption];
      setEducationOptions(updatedEducationOptions);

      // Select the newly added education option
      setSelectedEducation([...selectedEducation, newEducationOption]);
    }
  };
  const handleAddCertif = () => {
    // Open a dialog or prompt for users to enter the new education option
    const newCertifOptions = prompt("Enter the new certificate option:");
    if (newCertifOptions) {
      // Add the new education option to the existing options
      const updatedCertifOptions = [...CertifOptions, newCertifOptions];
      setCertifOptions(updatedCertifOptions);

      // Select the newly added education option
      setSelectedCertif([...selectedCertif, newCertifOptions]);
    }
  };
  // Ajoutez une fonction pour gérer l'ajout d'une nouvelle option d'expérience
  const handleAddExperience = () => {
    const newExperienceOption = prompt("Enter the new experience option:");
    if (newExperienceOption) {
      const updatedExperienceOptions = [...experienceOptions, newExperienceOption];
      setExperienceOptions(updatedExperienceOptions);
      setSelectedExperience([...selectedExperience, newExperienceOption]);
    }
  };
  const handleAddSkills = () => {
    const newSkillsOption = prompt("Enter the new skills option:");
    if (newSkillsOption) {
      const updatedSkillsOptions = [...skillsOptions, newSkillsOption];
      setSelectedSkills(updatedSkillsOptions);
      setSelectedSkills([...selectedSkills, newSkillsOption]);
    }
  };

  const handleSkillsChange = (event, newSkills) => {
    setSelectedSkills(newSkills);
    setFormData({
      ...formData,
      skills: newSkills.join(", "),
    });
  };
  const handleEducationChange = (event, newEducation) => {
    setSelectedEducation(newEducation);
    setFormData({
      ...formData,
      formation: newEducation.join(", "),
    });
  };
  const handleCertifChange = (event, newCertif) => {
    setSelectedCertif(newCertif);
    setFormData({
      ...formData,
      certificates: newCertif.join(", "),
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
      setOpenEducationDialog(false); // Fermer le dialogue de l'éducation après la mise à jour
      setOpenCertifDialog(false); // Fermer le dialogue de l'éducation après la mise à jour

      setOpenExperienceDialog(false);
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
  const [openDialogCv, setOpenDialogCv] = useState(false);

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
  // Ajoutez une fonction pour gérer les changements dans les options de l'expérience
  const handleOpenExperienceChange = (event, newExperience) => {
    setSelectedExperience(newExperience);
    setFormData({
      ...formData,
      experience: newExperience.join(", "), // Mettre à jour l'état formData avec les options sélectionnées
    });
  };

  const handleCloseDialog = () => {
    setOpenContactDialog(false);
    setOpenProfileDialog(false);
    setEditingSection(null);
    setOpenDialog(false);

  };




  const handleFileChange = (event) => {
    // Récupérer le fichier téléchargé
    const file = event.target.files[0];
    // Lire le contenu du fichier en tant que données binaires
    const reader = new FileReader();
    reader.onloadend = () => {
      // Stocker les données de l'image
      setImageData(reader.result);
    };
    // Lire le contenu du fichier en tant que données binaires
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = event.target.querySelector('input[type="file"]');
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('cV', file);
  
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.put(`http://localhost:5000/user/uploadCV/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('File uploaded successfully:', response.data);
        // Update state with the uploaded image data
        setImageData(response.data.imageUrl);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('No file selected');
    }
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
                <div>
                  <h2>My CV</h2>
                  
                  <img src={userInfo.cV} alt="Uploaded" onClick={() => setOpenDialogCv(true)} />

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
                    <EditIcon color="primary" onClick={() => setOpenExperienceDialog(true)} />
                  </h3>
                  <div style={contactContainer}>

                    <p style={textStyle}>{userInfo.experience}</p>

                  </div>
                </div>

                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Education
                    <EditIcon color="primary" onClick={() => setOpenEducationDialog(true)} />
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
                    <EditIcon color="primary" onClick={() => setOpenCertifDialog(true)} />
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
                <Button onClick={handleAddSkills}>Add New</Button>
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
                  type="date"
                  label="Date of Birth"
                  value={selectedDateOfBirth}
                  onChange={(e) => handleDateOfBirthChange(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
            <Dialog open={openEducationDialog} onClose={() => setOpenEducationDialog(false)}>
              <DialogTitle>Edit Education</DialogTitle>
              <DialogContent>
                <Autocomplete
                  multiple
                  options={EducationOptions}
                  value={selectedEducation}
                  onChange={handleEducationChange}
                  renderInput={(params) => <TextField {...params} label="Education" />}
                />
                <Button onClick={handleAddEducation}>Add New</Button> {/* Add this button */}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenEducationDialog(false)}>Cancel</Button>
                <Button onClick={handleUpdateUser} color="primary">Save</Button>
              </DialogActions>
            </Dialog>

            <Dialog open={openCertifDialog} onClose={() => setOpenCertifDialog(false)}>
              <DialogTitle>Edit certificates</DialogTitle>
              <DialogContent>
                <Autocomplete
                  multiple
                  options={CertifOptions}
                  value={selectedCertif}
                  onChange={handleCertifChange}
                  renderInput={(params) => <TextField {...params} label="certificates" />}
                />
                <Button onClick={handleAddCertif}>Add New</Button> {/* Add this button */}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenCertifDialog(false)}>Cancel</Button>
                <Button onClick={handleUpdateUser} color="primary">Save</Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openExperienceDialog} onClose={() => setOpenExperienceDialog(false)}>
              <DialogTitle>Edit Experience</DialogTitle>
              <DialogContent>
                <Autocomplete
                  multiple
                  options={experienceOptions}
                  value={selectedExperience}
                  onChange={handleOpenExperienceChange} // Utiliser la nouvelle fonction pour gérer les changements
                  renderInput={(params) => <TextField {...params} label="Experience" />}
                />
                <Button onClick={handleAddExperience}>Add New</Button> {/* Ajouter ce bouton */}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenExperienceDialog(false)}>Cancel</Button>
                <Button onClick={handleUpdateUser} color="primary">Save</Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openDialogCv} onClose={() => setOpenDialogCv(false)}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
                    <input type="file" accept=".pdf, .doc, .docx, .jpg, .jpeg, .png" onChange={handleFileChange} />
                    <button type="submit">Upload</button>
          </form>
        </DialogContent>
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