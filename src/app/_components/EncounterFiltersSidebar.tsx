"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";

interface EncounterFiltersSidebarProps {
  filters: {
    productType: string;
    status: string;
    facility: string;
    insurance: string;
    dateOfService: string;
    physician: string;
    createdBy: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      productType: string;
      status: string;
      facility: string;
      insurance: string;
      dateOfService: string;
      physician: string;
      createdBy: string;
    }>
  >;
  resetFilters: () => void;
  uniqueStatuses: string[];
  uniqueFacilities: string[];
  uniqueInsurances: string[];
  uniquePhysicians: string[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  deleteAllEncounters: () => void;
  isLoading?: boolean;
  refetch?: () => void;
}

const EncounterFiltersSidebar: React.FC<EncounterFiltersSidebarProps> = ({
  filters,
  setFilters,
  resetFilters,
  uniqueStatuses,
  uniqueFacilities,
  uniqueInsurances,
  uniquePhysicians,
  searchTerm,
  setSearchTerm,
  deleteAllEncounters,
  isLoading = false,
  refetch,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const onDeleteAllEncounters = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    deleteAllEncounters();
    setShowDeleteConfirm(false);
    // Reset search term and refetch data after deletion
    setSearchTerm("");
    if (refetch) {
      setTimeout(() => {
        void refetch();
      }, 200);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="flex w-[260px] flex-col gap-4 border-r border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Filters</h2>
        <div className="flex flex-col gap-3">
          {/* Product Type Filter */}
          <select
            value={filters.productType}
            onChange={(e) =>
              setFilters({ ...filters, productType: e.target.value })
            }
            className="rounded border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-blue-500 focus:outline-none"
          >
            <option value="">Product Type ▼</option>
            <option value="Prior Auth">Prior Auth</option>
            <option value="Claims">Claims</option>
            <option value="Appeals">Appeals</option>
          </select>
          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="rounded border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-blue-500 focus:outline-none"
          >
            <option value="">Status ▼</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {/* Facility Filter */}
          <select
            value={filters.facility}
            onChange={(e) =>
              setFilters({ ...filters, facility: e.target.value })
            }
            className="rounded border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-blue-500 focus:outline-none"
          >
            <option value="">Facility ▼</option>
            {uniqueFacilities.map((facility) => (
              <option key={facility} value={facility}>
                {facility}
              </option>
            ))}
          </select>
          {/* Insurance Filter */}
          <select
            value={filters.insurance}
            onChange={(e) =>
              setFilters({ ...filters, insurance: e.target.value })
            }
            className="rounded border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-blue-500 focus:outline-none"
          >
            <option value="">Insurance ▼</option>
            {uniqueInsurances.map((insurance) => (
              <option key={insurance} value={insurance}>
                {insurance}
              </option>
            ))}
          </select>
          {/* Date of Service Filter */}
          <select
            value={filters.dateOfService}
            onChange={(e) =>
              setFilters({ ...filters, dateOfService: e.target.value })
            }
            className="rounded border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-blue-500 focus:outline-none"
          >
            <option value="">Date of Service ▼</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          {/* Physician Filter */}
          <select
            value={filters.physician}
            onChange={(e) =>
              setFilters({ ...filters, physician: e.target.value })
            }
            className="rounded border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-blue-500 focus:outline-none"
          >
            <option value="">Physician ▼</option>
            {uniquePhysicians.map((physicianName) => (
              <option key={physicianName} value={physicianName ?? ""}>
                {physicianName}
              </option>
            ))}
          </select>
          {/* Created By Filter */}
          <select
            value={filters.createdBy}
            onChange={(e) =>
              setFilters({ ...filters, createdBy: e.target.value })
            }
            className="rounded border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-blue-500 focus:outline-none"
          >
            <option value="">Created By ▼</option>
            <option value="system">System</option>
            <option value="user">User</option>
          </select>
        </div>
        {/* Search Bar and Reset Button at the bottom */}
        <div className="mt-auto">
          <input
            type="text"
            placeholder="Search encounters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-6 w-full rounded border border-border bg-background p-2 text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={resetFilters}
            className="mt-3 w-full rounded border border-border bg-muted p-2 text-foreground hover:bg-muted/80"
          >
            Reset Filters
          </button>
          <button
            onClick={onDeleteAllEncounters}
            className="mt-3 w-full rounded border border-border bg-muted p-2 text-foreground text-red-700 hover:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete All Encounters"}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showDeleteConfirm &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-xl">
              <div className="mb-4 flex items-center">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    Delete All Encounters
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-foreground">
                  Are you sure you want to delete all encounters? This action
                  will permanently remove all encounter data and cannot be
                  reversed.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="rounded-md border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default EncounterFiltersSidebar;
