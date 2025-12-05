import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import shap
import streamlit as st
from sklearn.datasets import load_diabetes
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

st.set_page_config(page_title="What-if + SHAP", layout="wide")


# -----------------------------
# Utilities
# -----------------------------
@st.cache_data
def load_data():
    data = load_diabetes(as_frame=True)
    X = data.data.copy()
    y = data.target.copy()
    return X, y


def train_model(X: pd.DataFrame, y: pd.Series):
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    model = LinearRegression()
    model.fit(X_train, y_train)
    return model, X_train, X_test, y_train, y_test


def make_explainer(model, background: pd.DataFrame):
    return shap.Explainer(model, background)


def shap_bar_plot(expl_row, max_display=12):
    fig = plt.figure()
    shap.plots.bar(expl_row, max_display=max_display, show=False)
    st.pyplot(fig, clear_figure=True)


def shap_waterfall_plot(expl_row, max_display=12):
    fig = plt.figure()
    shap.plots.waterfall(expl_row, max_display=max_display, show=False)
    st.pyplot(fig, clear_figure=True)


# -----------------------------
# App
# -----------------------------
st.title("What-if analysis with SHAP (Linear Regression)")
st.caption(
    "Move sliders → see prediction + SHAP values update (no downloads; uses sklearn diabetes dataset)."
)

X, y = load_data()
model, X_train, X_test, y_train, y_test = train_model(X, y)

# Background for SHAP: small sample is enough
background = shap.utils.sample(X_train, 200, random_state=42)
explainer = make_explainer(model, background)

# Sidebar: baseline selection
with st.sidebar:
    st.header("Scenario")
    baseline_mode = st.selectbox(
        "Baseline row", ["Mean of training data", "Random training example"], index=0
    )

# Baseline row
if baseline_mode == "Mean of training data":
    baseline = X_train.mean(axis=0)
else:
    baseline = X_train.sample(1, random_state=42).iloc[0]

# Session state row
if "current_row" not in st.session_state:
    st.session_state.current_row = baseline.copy()

# Layout
left, right = st.columns([1.05, 1.4], gap="large")

# Percentile bounds to keep sliders reasonable
bounds = {
    c: (float(X_train[c].quantile(0.01)), float(X_train[c].quantile(0.99)))
    for c in X.columns
}

# ---- Left: sliders
with left:
    st.subheader("Inputs (sliders)")
    edited = st.session_state.current_row.copy()

    for c in X.columns:
        lo, hi = bounds[c]
        val = float(np.clip(edited[c], lo, hi))
        edited[c] = st.slider(
            label=c, min_value=lo, max_value=hi, value=val, step=(hi - lo) / 200.0
        )

    c1, c2 = st.columns(2)
    with c1:
        if st.button("Reset to baseline"):
            st.session_state.current_row = baseline.copy()
            st.rerun()
    with c2:
        if st.button("Set baseline = current"):
            baseline = edited.copy()
            st.session_state.current_row = edited.copy()
            st.success("Baseline updated to current inputs.")

# Update row
st.session_state.current_row = edited.copy()

# ---- Right: prediction + SHAP
with right:
    st.subheader("Prediction + SHAP explanation")

    x_df = pd.DataFrame([edited], columns=X.columns)

    pred = float(model.predict(x_df)[0])
    base_pred = float(model.predict(pd.DataFrame([baseline], columns=X.columns))[0])
    delta = pred - base_pred

    m1, m2, m3 = st.columns(3)
    m1.metric("Prediction", f"{pred:.2f}")
    m2.metric("Baseline prediction", f"{base_pred:.2f}")
    m3.metric("Δ vs baseline", f"{delta:+.2f}")

    st.markdown("---")

    # SHAP values for this row
    shap_values = explainer(x_df)
    sv_row = shap_values[0]  # single-row Explanation

    plot_type = st.radio(
        "Plot type", ["Waterfall (local)", "Bar (local)"], horizontal=True
    )
    if plot_type.startswith("Waterfall"):
        shap_waterfall_plot(sv_row, max_display=12)
    else:
        shap_bar_plot(sv_row, max_display=12)

    st.markdown("---")
    st.caption(
        "For linear regression, SHAP attributions typically line up with coefficient * (feature - baseline)."
    )

with st.expander("Show current input values"):
    st.dataframe(x_df, use_container_width=True)
