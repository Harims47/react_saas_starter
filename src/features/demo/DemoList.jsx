import React, { useState, useEffect } from "react";
import ListPageTemplate from "../templates/ListPageTemplate";
import AppButton from "../../components/common/AppButton";

const mockRecords = [
  { id: 1, name: "ERP System Integration", code: "ERP-M01", status: "Active", lead: "Alice Smith", budget: "$15,000" },
  { id: 2, name: "Billing & Fees Engine", code: "FEES-B02", status: "Active", lead: "Bob Johnson", budget: "$24,500" },
  { id: 3, name: "Clinic Patient Intake", code: "CLN-I03", status: "Draft", lead: "Carol Danvers", budget: "$8,000" },
  { id: 4, name: "HR Payroll Directory", code: "HR-P04", status: "Active", lead: "David Miller", budget: "$18,200" },
  { id: 5, name: "Inventory Stock Control", code: "INV-S05", status: "Inactive", lead: "Emma Watson", budget: "$12,000" },
  { id: 6, name: "CRM Leads Pipe", code: "CRM-L06", status: "Active", lead: "Frank Castle", budget: "$22,000" },
  { id: 7, name: "Teacher Scheduling", code: "SCH-T07", status: "Active", lead: "Grace Hopper", budget: "$14,000" },
  { id: 8, name: "Student Attendance Logs", code: "ATT-S08", status: "Active", lead: "Henry Cavill", budget: "$9,500" },
];

export const DemoList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [sortField, sortOrder, currentPage, searchQuery]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredRecords = mockRecords.filter((rec) => {
    const query = searchQuery.toLowerCase();
    return (
      rec.name.toLowerCase().includes(query) ||
      rec.code.toLowerCase().includes(query) ||
      rec.lead.toLowerCase().includes(query)
    );
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalItems = sortedRecords.length;
  const paginatedRecords = sortedRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Dynamic KPI Card calculations
  const totalBudgetVal = mockRecords.reduce((sum, rec) => {
    const num = parseInt(rec.budget.replace(/[^0-9]/g, ""), 10);
    return sum + num;
  }, 0);
  const formattedBudget = `$${totalBudgetVal.toLocaleString()}`;

  const kpis = [
    {
      title: "Total Modules",
      value: `${mockRecords.length} System modules`,
      icon: "bi-collection-fill",
      bgClass: "bg-primary bg-opacity-10",
      color: "text-primary",
    },
    {
      title: "Active Modules",
      value: `${mockRecords.filter(r => r.status === "Active").length} Operational`,
      icon: "bi-check-circle-fill",
      bgClass: "bg-success bg-opacity-10",
      color: "text-success",
    },
    {
      title: "Draft Configuration",
      value: `${mockRecords.filter(r => r.status === "Draft").length} Pending approval`,
      icon: "bi-hourglass-split",
      bgClass: "bg-warning bg-opacity-10",
      color: "text-warning",
    },
    {
      title: "Cumulative Budget",
      value: formattedBudget,
      icon: "bi-wallet2",
      bgClass: "bg-info bg-opacity-10",
      color: "text-info",
    },
  ];

  const columns = [
    { header: "Module Code", accessor: "code", sortable: true },
    { header: "Module Name", accessor: "name", sortable: true },
    { header: "Project Lead", accessor: "lead", sortable: true },
    { header: "Est. Budget", accessor: "budget", sortable: true },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      render: (row) => {
        const status = row.status;
        const bg = status === "Active" ? "success" : status === "Draft" ? "warning" : "secondary";
        return (
          <span 
            className={`badge bg-${bg} bg-opacity-10 text-${bg} rounded-pill border border-${bg} border-opacity-10 px-2.5 py-1.5`}
            style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.02em" }}
          >
            {status}
          </span>
        );
      },
    },
  ];

  const renderActions = (row) => (
    <div className="d-flex gap-1 justify-content-end">
      <AppButton
        size="sm"
        variant="outline-primary"
        onClick={() => alert(`Viewing details of: ${row.name}`)}
        icon="bi-eye"
        title="View details"
      />
      <AppButton
        size="sm"
        variant="outline-secondary"
        onClick={() => alert(`Editing: ${row.name}`)}
        icon="bi-pencil"
        title="Edit record"
      />
    </div>
  );

  const renderFilterSection = () => (
    <div className="d-flex align-items-center gap-2">
      <select className="form-select form-select-sm" style={{ width: "130px", fontSize: "0.85rem", height: "38px" }} aria-label="Status filter">
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Draft">Draft</option>
      </select>
    </div>
  );

  return (
    <ListPageTemplate
      title="SaaS Module Catalog"
      subtitle="Comprehensive list representing live modules deployed across ERP, CRM, Clinic, and HRMS tenants."
      createButtonText="Add Module"
      onCreateClick={() => alert("Create template trigger callback")}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      filterSection={renderFilterSection()}
      columns={columns}
      data={paginatedRecords}
      loading={loading}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={handleSort}
      actions={renderActions}
      currentPage={currentPage}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
      emptyMessage="No matching modules found."
      kpis={kpis}
    />
  );
};

export default DemoList;
