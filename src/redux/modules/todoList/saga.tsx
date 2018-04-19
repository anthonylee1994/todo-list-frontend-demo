import { takeLatest, all, put, call } from "redux-saga/effects";
import actions from "./actions";
import { IAction } from "../../../utils/interfaces";
import { apiPath } from "./constants";
import "isomorphic-fetch";
import { ITask } from "./interfaces";
import { get } from "lodash";

export default function* rootSaga() {
    yield all([
        takeLatest(actions.types.LIST.REQUEST, function* saga(action: IAction) {
            const response: Response = yield call(fetch, apiPath, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                const data: ITask[] = yield response.json();
                yield put(actions.creators.list.success(data));
            } else {
                yield put(actions.creators.list.failure(action, response));
            }
        }),
        takeLatest(actions.types.SHOW.REQUEST, function* saga(action: IAction) {
            const id: number = get(action, "payload.id", 0);
            const response: Response = yield call(fetch, apiPath + `/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                const data: ITask = yield response.json();
                yield put(actions.creators.show.success(data));
            } else {
                yield put(actions.creators.show.failure(action, response));
            }
        }),
        takeLatest(actions.types.SAVE.REQUEST, function* saga(action: IAction) {
            const item: ITask = get(action, "payload.item");
            const response: Response = yield call(fetch, apiPath, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });
            if (response.status === 201) {
                const data: ITask = yield response.json();
                yield put(actions.creators.save.success(data));
            } else {
                yield put(actions.creators.save.failure(action, response));
            }
        }),
        takeLatest(actions.types.UPDATE.REQUEST, function* saga(action: IAction) {
            const items: ITask[] = get(action, "payload.items", []);
            const item: ITask = get(action, "payload.item");
            let response: Response;
            if (items.length > 0) {
                response = yield call(fetch, apiPath, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        items,
                    }),
                });
            } else {
                response = yield call(fetch, apiPath, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        item,
                    }),
                });
            }
            if (response.status === 200) {
                const data: ITask | ITask[] = yield response.json();
                yield put(actions.creators.update.success(data));
            } else {
                yield put(actions.creators.update.failure(action, response));
            }
        }),
        takeLatest(actions.types.REMOVE.REQUEST, function* saga(action: IAction) {
            const items: ITask[] = get(action, "payload.items", []);
            const item: ITask = get(action, "payload.item");
            let response: Response;
            if (items.length > 0) {
                response = yield call(fetch, apiPath, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ids: items.map((x) => x.id),
                    }),
                });
            } else {
                response = yield call(fetch, apiPath, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: item.id,
                    }),
                });
            }
            if (response.status === 200) {
                if (items.length > 0) {
                    yield put(actions.creators.remove.success(items));
                } else {
                    yield put(actions.creators.remove.success(item));
                }
            } else {
                yield put(actions.creators.remove.failure(action, response));
            }
        }),
    ]);
}
