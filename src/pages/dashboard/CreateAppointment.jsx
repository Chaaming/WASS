import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard, StatisticsCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import React, { useEffect, useState } from "react";
import { DatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { server } from "../../../server";
import { getAllStaffs } from "@/actions/user";

export function CreateAppointment() {
  const [value, setValue] = React.useState();
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState(null);
  const [formData, setFormData] = useState({
    reg_no: "",
    note: "",
    time: "",
    date: "",
    staffId: "",
  });

  useEffect(() => {
    getAllStaffs()
      .then((staffs) => {
        setStaffs(staffs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });

  }, []);
  console.log(staffs);
  if (loading) {
    return <div>Loading...</div>;
  }
  
  const handleRadioChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormChange = (event) => {
    const { name, value, files } = event.target;
    if (value) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    if (files) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: files }));
    }
    // setValidationError(""); // Clear the validation error message
  };
  
  const handleSubmit = async () => {
    if (!formData.booking_title || !formData.date || !formData.desc || !formData.time) {
      return toast.error('All fields are required!', {
        id: "error",
      })
    }
    try {
      const response = await fetch(`${server}/create-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const res = await response.json();
      if (response.ok) {
        toast.success("Success");
        // navigate("/user-order/success");
        // window.location.reload(true);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Failed");
      console.log(error);
    }
  };
  console.log(formData);
    
  return (
    <>
      <div className="relative mt-8 p-5 w-full overflow-hidden rounded-xl bg-[white] bg-cover	bg-center">
        <div className="mb-8 p-6 border rounded-[5px]">
          <h1 className="font-[600]">Select a staff</h1>
          <div className="flex gap-5 mt-4">
            {staffs.map((staff, index) => (
              <div className="flex" key={index}>
                <input
                  type="radio"
                  id={`staff-${index}`}
                  name="staff"
                  value={staff._id}
                  // checked={formData["heard_us"] === staff.name}
                  onChange={handleRadioChange}
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor={`staff-${index}`}
                  className="flex w-full py-2 px-2 text-gray-500 bg-white border border-gray-200 cursor-pointer peer-checked:border-purple-700 peer-checked:text-purple-800 hover:text-gray-600 hover:bg-gray-100"
                >
                  <div className="block">
                    <div className="w-full text-[.9rem] font-semibold">
                      Name: {staff.name}
                    </div>
                    <div className="w-full text-[.9rem] font-semibold">
                      Department: {staff.department}
                    </div>
                    <div className="w-full text-[.9rem] font-semibold">
                      Position: {staff.role}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

  <div className="flex mb-8 p-6 border rounded-[5px] justify-center">
        <div className="w-[50%] border-r">
          <div>
            <h1 className="text-center font-[600]">Select From Available Dates</h1>
            <div className="mt-3 pr-4">
              <ul className="grid gap-3">
                <li>
                  <input
                    type="radio"
                    id={`date-1`}
                    name="date"
                    // value={staff._id}
                    // checked={formData["heard_us"] === staff.name}
                    onChange={handleRadioChange}
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor={`date-1`}
                    className="flex py-2 px-2 text-gray-500 bg-white border border-gray-200 cursor-pointer peer-checked:border-purple-700 peer-checked:text-purple-800 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <div className="">
                      <div className="text-[.9rem] font-semibold">
                        21/02/2024
                      </div>
                      <div className="text-[.9rem] font-semibold">
                        Monday
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-[50%] ">
          <div>
            <h1 className="text-center font-[600]">Select From Available Time</h1>
            <div className="mt-3 pl-4">
              <ul className="flex flex-wrap justify-evenly gap-3">
                <li className="w-[45%]">
                  <input
                    type="radio"
                    id={`time-1`}
                    name="time"
                    // value={staff._id}
                    // checked={formData["heard_us"] === staff.name}
                    onChange={handleRadioChange}
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor={`time-1`}
                    className="flex rounded-[5px] py-2 px-2 text-gray-500 bg-white border border-gray-200 cursor-pointer peer-checked:border-purple-700 peer-checked:text-purple-800 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <div className="">
                      <div className="text-[.9rem] font-semibold">
                        21/02/2024
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
  </div>
  <div className="p-6 border rounded-[5px] justify-center">
    <h1 className="font-[600]">Appointment Details</h1>
    <div className="my-6 grid gap-4">
      <div className="flex gap-4 items-center">
        <label for="1">Matric No./ Staff No.:</label>
        <input type="text" id="1" name="booking_title" onChange={handleFormChange} className="flex h-9 w-full md:w-[40%] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition duration-200 r-blue-500 placeholder-gray-500 placeholder"/>
      </div>
      <div className="flex gap-4 items-center">
        <label for="2">Short Note:</label>
        <textarea type="text" id="2" name="desc" onChange={handleFormChange} className="flex h-9 w-full md:w-[40%] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition duration-200 r-blue-500 placeholder-gray-500 placeholder"/>
      </div>
      {/* <div className="flex gap-4 items-center">
        <label htmlFor="">Set Date</label>
        <atDePicker name="date" onChange={(newValue) => setFormData( (prev) => ({ ...prev , date: `${newValue.$d}`}))}/>
      </div> */}
    </div>
    {/* <div className="flex gap-4 items-center">
      <label htmlFor="">Set Time</label>
      <MobileTimePicker name="time" onChange={(newValue) => setFormData( (prev) => ({ ...prev , time: `${newValue.$d}`}))}/>   
    </div> */}
  </div>
  <div className="flex mt-4">
    <button onClick={handleSubmit} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-purple-900 text-white shadow hover:bg-primary/90 h-9 px-4 py-2">Book</button>
  </div>
</div>
      {/* <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Richard Davis
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <div className="flex flex-col gap-12">
                {platformSettingsData.map(({ title, options }) => (
                  <div key={title}>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      {title}
                    </Typography>
                    <div className="flex flex-col gap-6">
                      {options.map(({ checked, label }) => (
                        <Switch
                          key={label}
                          id={label}
                          label={label}
                          defaultChecked={checked}
                          labelProps={{
                            className: "text-sm font-normal text-blue-gray-500",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ProfileInfoCard
              title="Profile Information"
              description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              details={{
                "first name": "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: "alecthompson@mail.com",
                location: "USA",
                social: (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-twitter text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            />
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversationsData.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button variant="text" size="sm">
                        reply
                      </Button>
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Projects
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              Architects design houses
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
                ({ img, title, description, tag, route, members }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {tag}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Link to={route}>
                        <Button variant="outlined" size="sm">
                          view project
                        </Button>
                      </Link>
                      <div>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </div>
        </CardBody>
      </Card> */}
    </>
  );
}

export default CreateAppointment;
