import {expect, test} from "bun:test";
import { SessionManager } from "../backend/SessionManager.ts";

test("TestConstructor", () => {
   var sessionManager = new SessionManager();
   expect(sessionManager).not.toBeNull();
    
});
