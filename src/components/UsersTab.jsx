import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Icon,
  Message,
  Rating,
  Table,
} from "semantic-ui-react";
import useAjaxHook from "use-ajax-request";
import css from "../styles/users/UsersTab.module.scss";
import { CardClass, MenuClass, SelectClass } from "../utils/utils";
import axios from "axios";
import { useInput } from "use-manage-form";
import { Link, Navigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import dummyUser from "../assets/img/placeholder-img.png";

const testUser = {
  createdAt: "2072-12-27T03:44:22.522Z",
  orgName: "labore-dolor-et",
  userName: "Wilburn.Rice",
  email: "Maverick.Hyatt83@gmail.com",
  phoneNumber: "(553) 208-0727 x31321",
  lastActiveDate: "2099-02-28T23:17:40.013Z",
  profile: {
    firstName: "Darian",
    lastName: "Rolfson",
    phoneNumber: "494-278-0946",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg",
    gender: "Male",
    bvn: "815809412",
    address: "Gusikowski Locks",
    currency: "NGN",
  },
  guarantor: {
    firstName: "Celine",
    lastName: "Monahan",
    phoneNumber: "1-482-227-3654 x71086",
    gender: "Male",
    address: "O'Hara Centers",
  },
  accountBalance: "496.00",
  accountNumber: "GWQUSEH1",
  socials: {
    facebook: "@lendsqr",
    instagram: "@lendsqr",
    twitter: "@lendsqr",
  },
  education: {
    level: "Bsc",
    employmentStatus: "Employed",
    sector: "FinTech",
    duration: "2 Years",
    officeEmail: "Edna4@yahoo.com",
    monthlyIncome: ["128.57", "118.07"],
    loanRepayment: "122.47",
  },
  id: "1",
};

const Card = ({ item, className }) => {
  return (
    <>
      <div className={`${css.card} ${className}`}>
        <div className={css["icon-container"]}>
          <i className={item?.icon}></i>
        </div>
        <em>{item?.title}</em>
        <em>{item?.value}</em>
      </div>
    </>
  );
};

const cards = [
  new CardClass("users icon", "Users", 2453),
  new CardClass("fa-solid fa-users-between-lines", "Active users", 2453),
  new CardClass("fa-solid fa-file-pen", "Users with loans", 12453),
  new CardClass("fa-solid fa-database", "Users with savings", 102453),
];

const Tag = ({ className, type }) => {
  return <em className={`${css.tag} ${className} ${css[type]}`}>{type}</em>;
};

const Pagination = ({
  totalData,
  dataPerPage,
  paginate,
  currentPage,
  currentData,
}) => {
  const numbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    numbers.push(i);
  }

  const forward = () => {
    if (currentPage < Math.ceil(totalData / dataPerPage)) {
      paginate((prev) => prev + 1);
    }
  };

  const backward = () => {
    if (currentPage > 1) {
      paginate((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className={css.pagination}>
        <div className={css["total-container"]}>
          <p>
            Showing <em>{(currentPage - 1) * dataPerPage + currentData}</em> out
            of <b>{totalData}</b>
          </p>
        </div>
        <div className={css["paginate-container"]}>
          <em onClick={backward}>
            <i className="fa-solid fa-arrow-left-long"></i>
          </em>
          {numbers?.length > 3 ? (
            <>
              {numbers?.slice(0, 3)?.map((num) => (
                <>
                  <em onClick={() => paginate(num)}>{num}</em>
                </>
              ))}
              ...
              {numbers
                ?.slice(numbers?.length - 2, numbers?.length)
                ?.map((num) => (
                  <>
                    <em onClick={() => paginate(num)}>{num}</em>
                  </>
                ))}
            </>
          ) : (
            numbers?.map((num) => (
              <>
                <em onClick={() => paginate(num)}>{num}</em>
              </>
            ))
          )}
          <em onClick={forward}>
            <i className="fa-solid fa-arrow-right-long"></i>
          </em>
        </div>
      </div>
    </>
  );
};

const Filter = ({
  setData,
  allData,
  persistData,
  prevData,
  toogleFilter,
  setCurrentPage,
}) => {
  const {
    value: organization,
    isValid: organizationIsValid,
    inputIsInValid: organizationInputIsInvalid,
    onChange: onOrganizationChange,
    onBlur: onOrganizationBlur,
    reset: resetOrganization,
  } = useInput((value) => value?.trim() !== "");

  const {
    value: name,
    isValid: nameIsValid,
    inputIsInValid: nameInputIsInvalid,
    onChange: onNameChange,
    onBlur: onNameBlur,
    reset: resetName,
  } = useInput((value) => value?.trim() !== "");

  const {
    value: email,
    isValid: emailIsValid,
    inputIsInValid: emailInputIsInvalid,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    reset: resetEmail,
  } = useInput((value) => value?.trim() !== "");

  const {
    value: phone,
    isValid: phoneIsValid,
    inputIsInValid: phoneInputIsInvalid,
    onChange: onPhoneChange,
    onBlur: onPhoneBlur,
    reset: resetPhone,
  } = useInput((value) => value?.trim() !== "");

  const {
    value: date,
    isValid: dateIsValid,
    inputIsInValid: dateInputIsInvalid,
    onChange: onDateChange,
    onBlur: onDateBlur,
    reset: resetDate,
  } = useInput((value) => value?.trim() !== "");

  const {
    value: status,
    isValid: statusIsValid,
    inputIsInValid: statusInputIsInvalid,
    onChange: onStatusChange,
    onBlur: onStatusBlur,
    reset: resetStatus,
  } = useInput((value) => value?.trim() !== "");

  const organizationOptions = allData?.map(
    (data, i) => new SelectClass(i, data?.orgName, data?.orgName)
  );

  const statusOptions = ["Active", "Pending", "InActive", "Blacklisted"].map(
    (status, i) => new SelectClass(i, status, status)
  );

  const filter = () => {
    // const filteredData = allData?.filter(
    //   (data) =>
    //     (organizationIsValid ? data?.orgName === organization : true) ||
    //     (nameIsValid ? data?.userName === name : true) ||
    //     (emailIsValid ? data?.email === email : true) ||
    //     (phoneIsValid ? data?.phoneNumber === phone : true) ||
    //     (dateIsValid
    //       ? new Date(data?.createdAt)?.getTime() === new Date(date)?.getTime()
    //       : true) ||
    //     (statusIsValid ? true : true)
    // );
    const filteredData = allData?.filter(
      (data) =>
        data?.orgName === organization ||
        data?.userName === name ||
        data?.email === email ||
        data?.phoneNumber === phone ||
        new Date(data?.createdAt)?.getTime() === new Date(date)?.getTime()
    );
    setData(filteredData);
    persistData({ organization, name, email, phone, date, status });
    setCurrentPage(1);
    toogleFilter(false);
    // console.log("ALL DATA", allData);
    // console.log("FILTERED DATA", filteredData);
  };

  const reset = () => {
    resetOrganization();
    resetName();
    resetEmail();
    resetPhone();
    resetStatus();
    resetDate();

    persistData({});

    setData(allData);
    toogleFilter(false);
  };

  useEffect(() => {
    onOrganizationChange(prevData?.organization ? prevData?.organization : "");
    onNameChange(prevData?.name ? prevData?.name : "");
    onEmailChange(prevData?.email ? prevData?.email : "");
    onPhoneChange(prevData?.phone ? prevData?.phone : "");
    onDateChange(prevData?.date ? prevData?.date : "");
    onStatusChange(prevData?.status ? prevData?.status : "");
  }, []);

  return (
    <div className={css.filter}>
      <Form onSubmit={filter}>
        <Form.Select
          label="Organization"
          placeholder="Select organization"
          className={css.select}
          value={organization}
          onChange={(e, { value }) => onOrganizationChange(value)}
          options={organizationOptions}
        />
        <Form.Input
          label="Username"
          placeholder="User"
          className={css.input}
          value={name}
          onChange={(e) => onNameChange(e?.target?.value)}
        />
        <Form.Input
          label="Phone number"
          placeholder="Phone"
          className={css.input}
          value={phone}
          onChange={(e) => onPhoneChange(e?.target?.value)}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          className={css.input}
          value={email}
          onChange={(e) => onEmailChange(e?.target?.value)}
        />
        <Form.Input
          label="Date"
          placeholder="Date"
          type="date"
          className={css.input}
          value={date}
          onChange={(e) => onDateChange(e?.target?.value)}
        />
        <Form.Select
          label="Status"
          placeholder="Select status"
          className={css.select}
          value={status}
          onChange={(e, { value }) => onStatusChange(value)}
          options={statusOptions}
        />
        <div className={css.actions}>
          <Button type="reset" onClick={reset}>
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

const UserOptions = ({ onViewDetails, onActivate, onBlacklist, user }) => {
  return (
    <Link to={`/dashboard/user/${user?.id}`} className={css["user-options"]}>
      <div className={css.group}>
        <Icon name="eye" /> <em>User details</em>
      </div>
      <div className={css.group}>
        <Icon name="user delete" /> <em>Blacklist user</em>
      </div>
      <div className={css.group}>
        <Icon name="user plus" /> <em>Activate user</em>
      </div>
    </Link>
  );
};

export const UserDetails = () => {
  const params = useParams();
  const [mappedUser, setMappedUser] = useState(/**@type testUser */ {});
  const {
    sendRequest: getUser,
    data: user,
    error,
    loading,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${params?.id}`,
      method: "GET",
    },
  });

  const menus = [
    new MenuClass("General Details", "fa-solid fa-circle-info"),
    new MenuClass("Documents", "fa-solid fa-folder-open"),
    new MenuClass("Bank Details", "fa-solid fa-building-columns"),
    new MenuClass("Loans", "fa-solid fa-hand-holding-dollar"),
    new MenuClass("Savings", "fa-solid fa-piggy-bank"),
    new MenuClass("App and System", "fa-solid fa-mobile-button"),
  ];

  const mapFunction = ([key, eachItem], i) => {
    if (typeof eachItem === "object")
      return (
        <>
          <ProfileSection header={key} profileDetails={eachItem} />
          <Divider />
        </>
      );
  };

  const ProfileSection = ({ header, profileDetails }) => {
    return (
      <div className={css["profile-section"]}>
        {header && <h3>{header}</h3>}
        <div className={css["all-section"]}>
          {Object.entries(profileDetails)?.map(([key, eachItem]) => (
            <div className={css["each-section"]}>
              <em>{key}</em>
              <em>
                {typeof eachItem === "string"
                  ? eachItem
                  : Array.isArray(eachItem)
                  ? `NGN ${eachItem[0]} - NGN ${eachItem[1]}`
                  : null}
              </em>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const onGetUserSuccess = ({ data: userDetails = testUser }) => {
    const user = {
      ["personal information"]: {
        ["full name"]: `${userDetails?.profile?.firstName} ${userDetails?.profile?.lastName}`,
        ["phone number"]: userDetails?.phoneNumber,
        ["email address"]: userDetails?.email,
        ["bvn"]: userDetails?.profile?.bvn,
        ["gender"]: userDetails?.profile?.gender,
        ["marital status"]: `Single`,
        ["children"]: `None`,
        ["type of residence"]: `Parent apartment`,
      },
      ["education and employment"]: {
        ["level of education"]: userDetails?.education?.level,
        ["employment status"]: userDetails?.education?.employmentStatus,
        ["sector of employment"]: userDetails?.education?.sector,
        ["duration of employment"]: userDetails?.education?.duration,
        ["office email"]: userDetails?.email,
        ["monthly income"]: `${userDetails?.profile?.currency} ${userDetails?.education?.monthlyIncome[0]} - ${userDetails?.profile?.currency} ${userDetails?.education?.monthlyIncome[1]}`,
        ["loan repayment"]: userDetails?.education?.loanRepayment,
      },
      ["Socials"]: {
        ["twitter"]: userDetails?.socials?.twitter,
        ["facebook"]: userDetails?.socials?.facebook,
        ["instagram"]: userDetails?.socials?.instagram,
      },
      ["guarantor"]: {
        ["full name"]: `${userDetails?.guarantor?.firstName} ${userDetails?.guarantor?.lastName}`,
        ["phone number"]: userDetails?.guarantor?.phoneNumber,
        ["email address"]: userDetails?.email,
        ["relationship"]: `Sister`,
      },
    };

    setMappedUser(user);
  };

  useEffect(() => {
    getUser(onGetUserSuccess);
  }, []);

  if (loading)
    return (
      <div style={{ width: "100%", height: "90vh" }}>
        <Loader />
      </div>
    );

  if (error)
    return (
      <div
        style={{
          width: "100%",
          height: "90vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {error?.response?.status === 500 ? (
          <Message
            error
            content={`There was an error fetching user, please reload browser`}
            icon="page4"
          />
        ) : error?.response?.status === 404 ? (
          <Message
            error
            content={`User with id ${params.id} not found`}
            icon="page4"
          />
        ) : (
          <Message
            error
            content={`There was an error fetching user, please reload browser`}
            icon="page4"
          />
        )}
      </div>
    );

  if (user)
    return (
      <section className={css["user-details"]}>
        <div className={css["back-link"]}>
          <Link to="/dashboard/users">
            <Icon name="arrow left" />
            <em>Back to Users</em>
          </Link>
        </div>
        <div className={css["heading"]}>
          <h2>User Details</h2>
          <div className={css["actions"]}>
            <Button>Blacklist User</Button>
            <Button>Activate User</Button>
          </div>
        </div>
        <div className={css["profile-head"]}>
          <div className={css["profile-items"]}>
            <div className={css.profile}>
              <div className={css["img-container"]}>
                <img
                  src={
                    user?.profile?.avatar ? user?.profile?.avatar : dummyUser
                  }
                  alt=""
                />
              </div>
              <div className={css.details}>
                <em>{`${user?.profile?.firstName} ${user?.profile?.lastName}`}</em>
                <em>{user?.accountNumber}</em>
              </div>
            </div>
            <div className={css.rating}>
              <em>User's Tier</em>
              <div className={css.stars}>
                <Rating icon="star" defaultRating={3} maxRating={5} />
              </div>
            </div>
            <div className={css.details}>
              <em>
                {user?.profile?.currency} {user?.accountBalance}
              </em>
              <em>{`${user?.profile?.bvn}/Access bank`}</em>
            </div>
          </div>
          <ul className={css["menu-items"]}>
            {menus.map((menu) => (
              <li>
                <i className={menu.icon} title={menu.name}></i>
                <Link>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={css["profile-body"]}>
          {Object.entries(mappedUser)?.map(mapFunction)}
          <br />
          <br />
          <ProfileSection profileDetails={mappedUser?.guarantor} />
        </div>
      </section>
    );
};

export const UsersTab = () => {
  const {
    sendRequest: getUsers,
    data: users,
    error,
    loading,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users`,
      method: "GET",
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [filterState, setFilterState] = useState("");
  const [persistedData, setPersistedData] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);
  const postsPerPage = 10;
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const paginateData = filteredUsers?.slice(firstIndex, lastIndex);
  const [userOptionsState, setUserOptionsState] = useState(false);

  const toogleFilter = (state) => {
    if (filterState === state) {
      setFilterState(false);
    } else {
      setFilterState(state);
    }
  };

  const toogleUserOptions = (state) => {
    if (userOptionsState === state) {
      setUserOptionsState(false);
    } else {
      setUserOptionsState(state);
    }
  };

  const filterTenary = (state) => {
    if (filterState === state)
      return (
        <Filter
          setData={setFilteredUsers}
          allData={users}
          persistData={setPersistedData}
          prevData={persistedData}
          toogleFilter={toogleFilter}
          setCurrentPage={setCurrentPage}
        />
      );
  };

  useEffect(() => {
    getUsers((res) => setFilteredUsers(res?.data));
  }, []);

  return (
    <>
      <section className={css["users"]}>
        <div className={css.heading}>
          <em>Users</em>
        </div>
        <div className={css["card-container"]}>
          {cards?.map((eachCard, i) => (
            <Card key={i} item={eachCard} className={css["each-card"]} />
          ))}
        </div>
        <div className={css["table-container"]}>
          <Table color="purple" padded stackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <div className={css.th}>
                    <em>ORGANIZATION</em>{" "}
                    <i
                      className="fa-solid fa-bars-staggered"
                      onClick={() => toogleFilter("organization")}
                    ></i>
                    {filterTenary("organization")}
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div className={css.th}>
                    <em>USERNAME</em>{" "}
                    <i
                      className="fa-solid fa-bars-staggered"
                      onClick={() => toogleFilter("username")}
                    ></i>{" "}
                    {filterTenary("username")}
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div className={css.th}>
                    <em>EMAIL</em>{" "}
                    <i
                      className="fa-solid fa-bars-staggered"
                      onClick={() => toogleFilter("email")}
                    ></i>{" "}
                    {filterTenary("email")}
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div className={css.th}>
                    <em>PHONE NUMBER</em>{" "}
                    <i
                      className="fa-solid fa-bars-staggered"
                      onClick={() => toogleFilter("phone")}
                    ></i>{" "}
                    {filterTenary("phone")}
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div className={css.th}>
                    <em>DATE JOINED</em>{" "}
                    <i
                      className="fa-solid fa-bars-staggered"
                      onClick={() => toogleFilter("date")}
                    ></i>{" "}
                    {filterTenary("date")}
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div className={css.th}>
                    <em>STATUS</em>{" "}
                    <i
                      className="fa-solid fa-bars-staggered"
                      onClick={() => toogleFilter("status")}
                    ></i>{" "}
                    {filterTenary("status")}
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {paginateData?.map((user) => (
                <>
                  <Table.Row key={user?.id}>
                    <Table.Cell>{user?.orgName}</Table.Cell>
                    <Table.Cell>
                      {/* {`${user?.profile?.firstName} ${user?.profile?.lastName}`} */}
                      {user?.userName}
                    </Table.Cell>
                    <Table.Cell>{user?.email}</Table.Cell>
                    <Table.Cell>{user?.phoneNumber}</Table.Cell>
                    <Table.Cell>
                      {new Date(user?.createdAt)?.toUTCString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Tag type="pending" />
                    </Table.Cell>
                    <Table.Cell
                      className={css["user-options-toogle-container"]}
                    >
                      <i
                        className="fa-solid fa-ellipsis-vertical"
                        onClick={() => toogleUserOptions(user?.id)}
                      ></i>{" "}
                      {userOptionsState === user?.id && (
                        <UserOptions user={user} />
                      )}
                    </Table.Cell>
                  </Table.Row>
                </>
              ))}
            </Table.Body>
          </Table>
          {loading && <Loader />}
          {error && (
            <Message
              error
              content="There was an error fetching your content, please refresh the page"
            />
          )}

          <Pagination
            totalData={filteredUsers?.length}
            dataPerPage={postsPerPage}
            paginate={setCurrentPage}
            currentPage={currentPage}
            currentData={paginateData?.length}
          />
        </div>
      </section>
    </>
  );
};
