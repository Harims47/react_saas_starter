# Common Component Library Documentation

This library provides core reusable UI components designed for the SaaS Starter Kit. They are built on top of **Bootstrap 5** and **Bootstrap Icons** and are fully responsive.

---

## 1. AppButton

A flexible wrapper for HTML `<button>` elements, including loading states and icons.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | - | Inner text/content of the button |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'light' \| 'dark' \| 'outline-*'` | `'primary'` | Bootstrap color mode variants |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Sizing class |
| `loading` | `boolean` | `false` | Renders a loading spinner and disables interaction |
| `disabled` | `boolean` | `false` | Disables user interactions |
| `icon` | `string` | - | Bootstrap Icon class (e.g. `'bi-save'`) |
| `fullWidth` | `boolean` | `false` | Expands width to occupy 100% of container |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type tag |
| `onClick` | `function` | - | Callback function for click events |
| `className` | `string` | `""` | Additional custom classes |

### Usage Example

```jsx
import AppButton from "../components/common/AppButton";

// Standard submit button
<AppButton type="submit" variant="primary">
  Save Settings
</AppButton>

// Loading button with full width
<AppButton loading={true} fullWidth={true}>
  Saving Changes...
</AppButton>

// Button with left-positioned icon
<AppButton variant="danger" icon="bi-trash">
  Delete Account
</AppButton>
```

---

## 2. AppInput

A form input component with built-in labels, prepended icons, password visibility toggles, and validation error messages.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | - | Heading label text above the input field |
| `placeholder` | `string` | - | Input placeholder value |
| `type` | `string` | `'text'` | Input types (`'text'`, `'email'`, `'password'`, etc.) |
| `required` | `boolean` | `false` | Appends a red asterisk to label and forces validation |
| `error` | `string` | - | Renders error text beneath the field and highlights borders red |
| `disabled` | `boolean` | `false` | Disables editing |
| `icon` | `string` | - | Prepends a Bootstrap Icon inside the field on the left |
| `showPasswordToggle` | `boolean` | `false` | Renders an eye show/hide button on the right for password fields |
| `value` | `string \| number` | - | React state value binding |
| `onChange` | `function` | - | Input change callback handler |
| `className` | `string` | `""` | Outer wrapper container class overrides |

### Usage Example

```jsx
import AppInput from "../components/common/AppInput";

// Email Input with Envelope Icon
<AppInput
  label="Email Address"
  placeholder="name@company.com"
  type="email"
  icon="bi-envelope"
  required={true}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// Password Input with Lock Icon and show/hide toggle
<AppInput
  label="Password"
  placeholder="••••••••"
  type="password"
  icon="bi-lock"
  showPasswordToggle={true}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

---

## 3. AppCard

A layout container element utilized for dashboard widgets, stats cards, and reports structures.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `React.ReactNode` | - | Title text or component in header |
| `subtitle` | `React.ReactNode` | - | Subtitle helper text below title |
| `actions` | `React.ReactNode` | - | Header-actions panel (placed on the right side of header) |
| `children` | `React.ReactNode` | - | Main inner body content |
| `footerContent` | `React.ReactNode` | - | Content nested inside footer container |
| `className` | `string` | `""` | Additional card container class overrides |

### Usage Example

```jsx
import AppCard from "../components/common/AppCard";

// Dashboard widget
<AppCard
  title="Active System Users"
  subtitle="Summary of logged-in sessions"
  actions={<button className="btn btn-sm btn-light">Refresh</button>}
>
  <p>Currently active: <strong>14,284 users</strong></p>
</AppCard>
```

---

## 4. AppLoader

A loading spinner helper supporting full pages, card sections, and transparent parent overlays.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `'section' \| 'page' \| 'overlay'` | `'section'` | Layout structure mode |
| `message` | `string` | `'Loading...'` | Spinner text |
| `className` | `string` | `""` | Custom wrapper class overrides |

### Usage Example

```jsx
import AppLoader from "../components/common/AppLoader";

// Loading full page viewport
<AppLoader type="page" message="Booting SaaS Starter..." />

// Loader overlay inside container (card block requires absolute/relative wrappers)
<div className="position-relative" style={{ height: "200px" }}>
  <AppLoader type="overlay" message="Fetching chart details..." />
</div>
```
