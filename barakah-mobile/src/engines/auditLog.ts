import type { AuditEntry, AuditEventType } from './types';

// Simple hash function for audit chain integrity
function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

let auditChain: AuditEntry[] = [];

export function createAuditEntry(
  type: AuditEventType,
  description: string,
  data: Record<string, unknown> = {}
): AuditEntry {
  const previousHash = auditChain.length > 0
    ? auditChain[auditChain.length - 1].hash
    : '00000000';

  const timestamp = Date.now();
  const payload = JSON.stringify({ type, description, data, timestamp, previousHash });
  const hash = simpleHash(payload);

  const entry: AuditEntry = {
    id: `audit-${timestamp}-${hash}`,
    type,
    description,
    data,
    timestamp,
    hash,
  };

  auditChain.push(entry);
  return entry;
}

export function getAuditLog(): ReadonlyArray<AuditEntry> {
  return [...auditChain];
}

export function getAuditLogByType(type: AuditEventType): AuditEntry[] {
  return auditChain.filter((e) => e.type === type);
}

export function verifyAuditChain(): boolean {
  if (auditChain.length <= 1) return true;

  for (let i = 1; i < auditChain.length; i++) {
    const prev = auditChain[i - 1];
    const current = auditChain[i];
    const payload = JSON.stringify({
      type: current.type,
      description: current.description,
      data: current.data,
      timestamp: current.timestamp,
      previousHash: prev.hash,
    });
    const expectedHash = simpleHash(payload);
    if (current.hash !== expectedHash) return false;
  }
  return true;
}

export function clearAuditLog(): void {
  auditChain = [];
}

export function getAuditLogSize(): number {
  return auditChain.length;
}
