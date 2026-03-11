"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import EventTypeList from "@/components/event-types/EventTypeList";
import { createEventType, deleteEventType, getEventTypes, updateEventType } from "@/services/api/events";

const initialForm = {
  name: "",
  slug: "",
  duration_minutes: "30",
  description: ""
};

export default function EventTypesPage() {
  const [eventTypes, setEventTypes] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [publicBaseUrl, setPublicBaseUrl] = useState("http://localhost:3000");

  useEffect(() => {
    setPublicBaseUrl(window.location.origin);
    loadEventTypes();
  }, []);

  async function loadEventTypes() {
    setLoading(true);
    setError("");

    try {
      const response = await getEventTypes();
      setEventTypes(response.data || []);
    } catch (loadError) {
      setError(loadError.message || "Unable to load event types.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function handleEdit(eventType) {
    setForm({
      name: eventType.name,
      slug: eventType.slug,
      duration_minutes: String(eventType.duration_minutes),
      description: eventType.description || ""
    });
    setEditingId(eventType.id);
    setMessage("");
    setError("");
  }

  async function handleDelete(id) {
    setDeletingId(id);
    setError("");
    setMessage("");

    try {
      await deleteEventType(id);
      setEventTypes((current) => current.filter((eventType) => eventType.id !== id));
      if (editingId === id) {
        resetForm();
      }
      setMessage("Event type deleted successfully.");
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete event type.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      duration_minutes: Number(form.duration_minutes),
      description: form.description.trim()
    };

    try {
      if (editingId) {
        const response = await updateEventType(editingId, payload);
        setEventTypes((current) =>
          current.map((eventType) => (eventType.id === editingId ? response.data : eventType))
        );
        setMessage("Event type updated successfully.");
      } else {
        const response = await createEventType(payload);
        setEventTypes((current) => [response.data, ...current]);
        setMessage("Event type created successfully.");
      }

      resetForm();
    } catch (saveError) {
      setError(saveError.message || "Unable to save event type.");
    } finally {
      setSaving(false);
    }
  }

  const activeCount = useMemo(() => eventTypes.filter((eventType) => eventType.is_active).length, [eventTypes]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Event Types"
        description="Create, edit, and manage the public booking links people use to schedule time with you."
        actionLabel={editingId ? "Cancel Edit" : null}
        onAction={resetForm}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active event types" value={String(activeCount)} helper="Ready for public booking" />
        <StatCard label="Booking links" value={String(eventTypes.length)} helper="Each event has its own slug" />
        <StatCard label="Editing mode" value={editingId ? "On" : "Off"} helper="Update or publish event details" />
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{editingId ? "Edit Event Type" : "Create Event Type"}</h3>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Define the title, duration, and slug for the public booking page.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-[var(--text)]">
            <span>Event Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
              placeholder="30 Minute Intro"
              required
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-[var(--text)]">
            <span>Slug</span>
            <input
              type="text"
              value={form.slug}
              onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
              className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
              placeholder="30-min-intro"
              required
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-[var(--text)]">
            <span>Duration (minutes)</span>
            <input
              type="number"
              min="1"
              value={form.duration_minutes}
              onChange={(event) => setForm((current) => ({ ...current, duration_minutes: event.target.value }))}
              className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
              required
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-[var(--text)] md:col-span-2">
            <span>Description</span>
            <textarea
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className="min-h-28 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
              placeholder="Describe what this meeting is for."
            />
          </label>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className={`rounded-full px-5 py-3 text-sm font-semibold text-white ${
                saving ? "cursor-not-allowed bg-slate-400" : "bg-[var(--primary)]"
              }`}
            >
              {saving ? "Saving..." : editingId ? "Save Changes" : "Create Event Type"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}
      </section>

      {loading ? (
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-6 text-sm text-[var(--text-soft)]">
          Loading event types...
        </section>
      ) : (
        <EventTypeList
          eventTypes={eventTypes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
          publicBaseUrl={publicBaseUrl}
        />
      )}
    </div>
  );
}
