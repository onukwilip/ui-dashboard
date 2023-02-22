import React, { useEffect, useState } from "react";
import { Button, Form, Icon, Table } from "semantic-ui-react";
import useAjaxHook from "use-ajax-request";
import css from "../styles/users/UsersTab.module.scss";
import { CardClass, SelectClass } from "../utils/utils";
import axios from "axios";
import { useInput } from "use-manage-form";
import { Link } from "react-router-dom";

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
            Showing <em>{currentData}</em> out of <b>{totalData}</b>
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

const Filter = ({ setData, allData, persistData, prevData, toogleFilter }) => {
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

const UsersTab = () => {
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
          <Table color="purple" padded>
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

export default UsersTab;
